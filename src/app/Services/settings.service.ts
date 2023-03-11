import { Injectable } from '@angular/core';
import { Settings } from '../components/shared/settings';
import { AuthService } from './auth.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  Settings: Settings|undefined|null;

  constructor(
    private authService:AuthService,
    private themeService:ThemeService
  ) {

    this.authService.afAuth.authState.subscribe(() => { // subscribe to login event
      this.LoadSettings();
    });

  }

  LoadSettings(){
    if(this.Settings == undefined || this.Settings == null || (this.authService.isLoggedIn && this.authService.userData.uid != this.Settings.User)){
      var Existing = null;

      if(this.authService.isLoggedIn && this.authService.userData != undefined){
        Existing = JSON.parse(localStorage.getItem('settings-'+this.authService.userData.uid)!); // every registered user can have their own
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
      
      if(this.Settings)
      this.themeService.applyTheme(this.Settings?.Theme);
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
  }

  MigrateSettings(){

  }

  ResetSettings() {
    if(this.authService.isLoggedIn && this.authService.userData != undefined){
      localStorage.removeItem('settings-'+this.authService.userData.uid)
    }else{
      localStorage.removeItem('settings');
    }
      this.Settings=null;
  }
}
