import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Settings } from './components/shared/settings';
import { LanguageService } from './Services/language.service';
import { SettingsService } from './Services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  Settings:Settings|undefined|null;
  
  constructor(private modalService: NgbModal, private settingsService:SettingsService, private languageService: LanguageService) {
    this.settingsService.LoadSettings();
    this.Settings = this.settingsService.Settings

    if(this.Settings)
    this.languageService.UseLanguage(this.Settings.Language)
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
