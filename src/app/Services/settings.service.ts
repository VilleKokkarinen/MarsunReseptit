import { EventEmitter, Injectable, Output } from '@angular/core';
import { Settings } from '../components/settings/settings';
import { NavigationEnd, Router } from '@angular/router';
import { AnalyticsService } from './analytics.service';
import { PBAuthService } from './pb.auth.service';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  Settings: Settings = this.GetDefaultSettings();

  @Output() SettingsChange = new EventEmitter<Settings>()
  
  constructor(
    private authService:PBAuthService,
    private router: Router,
    private analyticsService:AnalyticsService
  ) {
    this.authService.AuthChange.subscribe(() => { // subscribe to login event
      this.LoadSettings();
      this.AcceptSelectedCookies();
    });

    setTimeout(() => {
      if(this.Settings.CookieSettings.Show_Popup === true)
      {
        this.LoadSettings(); // if this is users first time entering the site, without having settings
      }
    }, 1000);

  }
  
  LoadSettings(){
    var Existing = null;

    Existing = JSON.parse(localStorage.getItem('settings')!);

    if(Existing == undefined || Existing == null){
      Existing = this.GetDefaultSettings();
      this.Settings = Existing;
      this.SaveSettings();
      console.log("Reset settings to default, no settings saved in local storage.")
    }else{
      console.log("Loaded settings from localstorage: ", Existing)
    }

    this.Settings = Existing;

    this.SettingsChange.emit(this.Settings);
  }

  GetDefaultSettings(){
    return new Settings();
  }

  SaveSettings(){
    localStorage.setItem('settings', JSON.stringify(this.Settings));
    this.SettingsChange.emit(this.Settings);
  }


  ResetSettings() {
    localStorage.removeItem('settings');
    this.Settings=this.GetDefaultSettings();
    this.SaveSettings();
  }


  public loadGtagScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-QEF0ZHWVW9';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  AcceptSelectedCookies(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (typeof gtag !== 'undefined') {
          gtag('config', 'G-QEF0ZHWVW9', {
            page_path: event.urlAfterRedirects,
          });
        }
      }
    });

    this.loadGtagScript();
    //this.analyticsService.eventEmitter('TEST', 'User visited page', "User visited page" , 'accept dialog', 1);
    if(this.Settings.CookieSettings.Analytics != true){
      this.RejectAnalytics();
    }else{
      this.Allowanalytics();
    }

    if(this.Settings.CookieSettings.Personalised_Ads != true){
      this.RejectPersonalisedAds();
    }else{
      this.AllowPersonalisedAds();
    }
  }

  Allowanalytics(){
    //gtag('set', 'consent', true);

    gtag('consent', 'update', {
    analytics_storage: 'granted',
    });
  }

  RejectAnalytics(){
    this.deleteCookie("_ga");
    this.deleteCookie("_ga_QEF0ZHWVW9");

    gtag('consent', 'update', {
    analytics_storage: 'denied',
    });
  }

  RejectPersonalisedAds(){
    this.deleteCookie("__gpi");
    this.deleteCookie("__gads");
    gtag('consent', 'update', {
    ad_storage: 'denied'
    });
  }

  AllowPersonalisedAds(){
    gtag('consent', 'update', {
    ad_storage: 'granted'
    });
  }

  private deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `Expires=${d.toUTCString()}`;
    let cpath: string = path ? `; Path=${path}` : '';
    let dpath: string = "Domain=.marsun-reseptit.com";
    document.cookie = `${name}=${value}; ${cpath}; ${dpath}; ${expires};`;
  }

}
