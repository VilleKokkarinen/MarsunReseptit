import { Component } from '@angular/core';
import { Settings } from 'src/app/components/settings/settings';
import { PublicUser } from 'src/app/components/shared/user';
import { LanguageService } from 'src/app/Services/language.service';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { SettingsService } from 'src/app/Services/settings.service';
import { ThemeService } from 'src/app/Services/theme/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  Settings:Settings;
  userData:PublicUser;
  rememberMe:boolean;

  constructor(private authService:PBAuthService, private settingsService:SettingsService, private themeService: ThemeService, private languageService:LanguageService) {
    this.Settings = settingsService.Settings
    this.userData = this.authService.userData;
    this.rememberMe = this.authService.GetRememberMe();

    this.settingsService.SettingsChange.subscribe((newSettings)=>{
      this.Settings = newSettings
    })
  }

  updateRememberMe(){
    this.authService.SetRememberMe(this.rememberMe);
    this.authService.SetLocalStorageUser();
  }

  SaveSettings(){
    this.settingsService.Settings = this.Settings;
    this.settingsService.SaveSettings();
  }


  ChangePrivacySettings(){
    this.Settings.CookieSettings.Show_Popup = true;
    this.SaveSettings();
  }

  ResetSettings(){
    this.settingsService.ResetSettings();
  }
}
