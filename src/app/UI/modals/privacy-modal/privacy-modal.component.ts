import { Component } from '@angular/core';
import { NgbActiveModal, NgbNavModule, NgbPanel,NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { CookieSettings } from 'src/app/components/settings/cookie-settings';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationEnd } from '@angular/router';
import { SettingsService } from 'src/app/Services/settings.service';
import { Settings } from 'src/app/components/settings/settings';
import { CommonModule } from '@angular/common';
import { LanguageService } from 'src/app/Services/language.service';

declare let gtag: Function;

@Component({
  selector: 'app-privacy-modal',
  templateUrl: './privacy-modal.component.html',
  styleUrls: ['./privacy-modal.component.css'],
  standalone: true,
  imports: [NgbNavModule, NgbPanel,NgbAccordionModule,FormsModule,TranslateModule,NgbDropdownModule, CommonModule ],
})
export class PrivacyModalComponent {
  active = 0; // active tab in legal jargon mode
  mode = 0; // legal jargon mode, or simple

  Settings: Settings;

  Languages:{key:string,value:string}[] = [];

  Search:String = "";

  constructor(private settingsService:SettingsService, public activeModal: NgbActiveModal, private languageService:LanguageService) {
    this.Settings = this.settingsService.Settings;
    this.Languages = LanguageService.Languages
  }

  selectLanguage(language:string){
    var selected = this.Languages.find(x => x.key == language);

    if(selected != undefined){
      this.Settings.Language = selected;
      this.languageService.UseLanguage(this.Settings.Language.value);
    }
  }

  AcceptAll(){
    this.Settings.CookieSettings.Analytics = true;
    this.Settings.CookieSettings.Personalised_Ads = true;
    this.Settings.CookieSettings.Geological_Area = true;
    this.AcceptSelected();
  }

  AcceptSelected(){
    this.Settings.CookieSettings.Show_Popup = false; // don't show the popup until user deletes local storage / changes privacy settings
    this.settingsService.Settings.CookieSettings = this.Settings.CookieSettings;

    this.settingsService.Settings.Language = this.Settings.Language;

    this.settingsService.AcceptSelectedCookies();
    this.settingsService.SaveSettings();
    this.Close();
  }

  RejectAll(){
    this.Settings.CookieSettings.Analytics = false;
    this.Settings.CookieSettings.Personalised_Ads = false;
    this.Settings.CookieSettings.Geological_Area = false;
    this.AcceptSelected();
  }
  
  Close(){
    this.activeModal.close('ok');
  }
}
