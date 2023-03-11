import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translateService: TranslateService, private settingsService:SettingsService) {
    if(settingsService.Settings)
    this.UseLanguage(settingsService.Settings?.Language)
  }

  UseLanguage(language:string){
    this.translateService.use(language)
  }
}
