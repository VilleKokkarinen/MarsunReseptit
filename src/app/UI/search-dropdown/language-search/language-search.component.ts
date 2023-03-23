import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Settings } from 'src/app/components/settings/settings';
import { LanguageService } from 'src/app/Services/language.service';
import { SettingsService } from 'src/app/Services/settings.service';

@Component({
  selector: 'app-language-search',
  templateUrl: './language-search.component.html',
  styleUrls: ['./language-search.component.css']
})
export class LanguageSearchComponent {
  Settings:Settings;
  
  Languages:{key:string,value:string}[] = [];

  Search:string="";
  
  constructor(private settingsService:SettingsService) {
    this.Languages = LanguageService.Languages
    this.Settings = settingsService.Settings
    this.settingsService.SettingsChange.subscribe((newSettings)=>{
      this.Settings = newSettings
    })
  }

  selectLanguage(language:string){
    var selected = this.Languages.find(x => x.key == language);

    if(selected != undefined){
      this.Settings.Language = selected;
      this.settingsService.SaveSettings();
    }
  }
}
