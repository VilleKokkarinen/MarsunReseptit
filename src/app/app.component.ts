import { Component } from '@angular/core';
import { LanguageService } from './Services/language.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from './Services/settings.service';
import { PrivacyModalComponent } from './UI/modals/privacy-modal/privacy-modal.component';
import { ThemeService } from './Services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private settingsService:SettingsService,
    private languageService:LanguageService, // don't remove. needed for initialization
    private themeService:ThemeService
    ) {
    this.settingsService.SettingsChange.subscribe((newSettings) => {
      if(newSettings.CookieSettings.Show_Popup === true){
        config.backdrop = 'static';
        config.keyboard = false;
        this.modalService.dismissAll("settings changed");
        this.open(PrivacyModalComponent)
      }
    })
   }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
