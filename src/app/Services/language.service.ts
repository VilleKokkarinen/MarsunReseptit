import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public static Languages:{key:string,value:string}[] = [
    {
      key:"English",
      value:"en"
    },
    {
      key:"Finnish",
      value:"fi"
    }
 ];

  constructor(private translateService: TranslateService, private settingsService:SettingsService) {
    this.settingsService.SettingsChange.subscribe((newSettings)=>{
      this.UseLanguage(newSettings.Language.value)
    })
  }

  UseLanguage(language:string){
    console.log("Switching language to:", language)
    this.translateService.use(language)
  }
}
