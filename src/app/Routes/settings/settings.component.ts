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
  Settings:Settings|undefined|null;

  constructor(private settingsService:SettingsService, private themeService: ThemeService, private languageService:LanguageService) {
    this.Settings = settingsService.Settings
  }

  UpdateTheme(){
    if(this.Settings)
    this.themeService.applyTheme(this.Settings.Theme)
  }
  
  UpdateLanguage(){
    if(this.Settings)
    this.languageService.UseLanguage(this.Settings.Language)
  }

  SaveSettings(){
    if(this.Settings)
    this.themeService.applyTheme(this.Settings.Theme)

    this.settingsService.SaveSettings();
  }

}
