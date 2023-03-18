import { EventEmitter, Injectable, Output } from '@angular/core';
import { Settings } from '../components/shared/settings';
import { AuthService } from './auth.service';
import { ThemeService } from './theme.service';
import { SharedService } from './shared.service';
import { NavigationEnd, Router } from '@angular/router';
import { AnalyticsService } from './analytics.service';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  Settings: Settings = this.GetDefaultSettings();

  @Output() SettingsChange = new EventEmitter<Settings>()
  
  constructor(
    private authService:AuthService,
    private router: Router,
    private analyticsService:AnalyticsService
  ) {

    this.authService.afAuth.authState.subscribe(() => { // subscribe to login event
      this.LoadSettings();
      this.AcceptSelectedCookies();
    },);
  }

  LoadSettings(){
    if(this.Settings == undefined || this.Settings == null || this.authService.isLoggedIn == false || (this.authService.isLoggedIn && this.authService.userData.uid != this.Settings.User)){
      var Existing = null;

      if(this.authService.isLoggedIn && this.authService.userData != undefined){
        Existing = JSON.parse(localStorage.getItem('settings-'+this.authService.userData.uid)!); // every registered user can have their own
        
        if(Existing == null)
        Existing = this.GetDefaultSettings();

        Existing.User = this.authService.userData.uid;
      }else{
        Existing = JSON.parse(localStorage.getItem('settings')!); // nonregistered users can have their own
      }
  
      console.log("Loaded settings from localstorage: ", Existing) // save to cloud at some point ?
  
      if(Existing == undefined || Existing == null){
        Existing = this.GetDefaultSettings();
        this.Settings = Existing;
        this.SaveSettings();
      }
  
      this.Settings = Existing;

      this.SettingsChange.emit(this.Settings);
    }
  }



  GetDefaultSettings(){
    return new Settings();
  }

  SaveSettings(){
    if(this.authService.isLoggedIn && this.authService.userData != undefined && this.Settings != undefined){
      this.Settings.User = this.authService.userData.uid;
      localStorage.setItem('settings-'+this.authService.userData.uid, JSON.stringify(this.Settings));
    }else{
      localStorage.setItem('settings', JSON.stringify(this.Settings));
    }
    this.SettingsChange.emit(this.Settings);
  }

  MigrateSettings(){

  }

  ResetSettings() {
    if(this.authService.isLoggedIn && this.authService.userData != undefined){
      localStorage.removeItem('settings-'+this.authService.userData.uid)
    }else{
      localStorage.removeItem('settings');
    }
      this.Settings=this.GetDefaultSettings();
      this.SaveSettings();
  }


  public loadGtagScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-NPTH5CEKC2';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  AcceptSelectedCookies(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (typeof gtag !== 'undefined') {
          gtag('config', 'G-NPTH5CEKC2', {
            page_path: event.urlAfterRedirects,
          });
        }
      }
    });

    this.loadGtagScript();
    //this.analyticsService.eventEmitter('TEST', 'User visited page', "User visited page" , 'accept dialog', 1);
    if(this.Settings.CookieSettings.Analytics != true){
      this.RejectAnalytics();
    }
    if(this.Settings.CookieSettings.Personalised_Ads != true){
      this.RejectPersonalisedAds();
    }
  }


  RejectAnalytics(){
    this.deleteCookie("_ga");
    this.deleteCookie("_ga_NPTH5CEKC2");
    gtag('set', 'consent', false);
    gtag('set', 'allow_google_signals', false);

  }

  RejectPersonalisedAds(){
    this.deleteCookie("__gpi");
    this.deleteCookie("__gads");
    gtag('set', 'consent', false);
    gtag('set', 'allow_google_signals', false);
  }

  private deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `Expires=${d.toUTCString()}`;
    let cpath: string = path ? `; Path=${path}` : '';
    let dpath: string = "Domain=.marsun-reseptit.web.app";
    document.cookie = `${name}=${value}; ${cpath}; ${dpath}; ${expires};`;
  }

}
