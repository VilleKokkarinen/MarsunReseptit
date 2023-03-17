import { Component } from '@angular/core';
import { Settings } from 'src/app/components/shared/settings';
import { LanguageService } from 'src/app/Services/language.service';
import { SettingsService } from 'src/app/Services/settings.service';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  Settings:Settings;

  constructor(private settingsService:SettingsService, private themeService: ThemeService, private languageService:LanguageService) {
    this.Settings = settingsService.Settings
    this.settingsService.SettingsChange.subscribe((newSettings)=>{
      this.Settings = newSettings
    })
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
