import { Component } from '@angular/core';
import { NgbActiveModal, NgbNavModule, NgbPanel,NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { CookieSettings } from 'src/app/components/shared/cookie-settings';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationEnd } from '@angular/router';
import { SettingsService } from 'src/app/Services/settings.service';
import { Settings } from 'src/app/components/shared/settings';

declare let gtag: Function;

@Component({
  selector: 'app-privacy-modal',
  templateUrl: './privacy-modal.component.html',
  styleUrls: ['./privacy-modal.component.css'],
  standalone: true,
  imports: [NgbNavModule, NgbPanel,NgbAccordionModule,FormsModule,TranslateModule ],
})
export class PrivacyModalComponent {
  active = 0; // active tab in legal jargon mode
  mode = 0; // legal jargon mode, or simple

  Settings: Settings;

  constructor(private settingsService:SettingsService, public activeModal: NgbActiveModal) {
    this.Settings = this.settingsService.Settings;
  }

  AcceptAll(){
    this.Settings.CookieSettings.Analytics = true;
    this.Settings.CookieSettings.Personalised_Ads = true;
    this.Settings.CookieSettings.Geological_Area = true;
    this.AcceptSelected();
  }

  AcceptSelected(){
    this.Settings.CookieSettings.Show_Popup = false;
    this.settingsService.Settings.CookieSettings = this.Settings.CookieSettings;
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
