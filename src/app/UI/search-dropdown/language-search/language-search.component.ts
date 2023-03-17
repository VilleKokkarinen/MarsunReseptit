import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Settings } from 'src/app/components/shared/settings';
import { SettingsService } from 'src/app/Services/settings.service';

@Component({
  selector: 'app-language-search',
  templateUrl: './language-search.component.html',
  styleUrls: ['./language-search.component.css']
})
export class LanguageSearchComponent {
  Settings:Settings;
  
  Languages:{key:string,value:string}[] = [
    {
      key:"English",
      value:"en"
    },
    {
      key:"Finnish",
      value:"fi"
    }
 ];

  Search:string="";
  
  constructor(private settingsService:SettingsService) {
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
