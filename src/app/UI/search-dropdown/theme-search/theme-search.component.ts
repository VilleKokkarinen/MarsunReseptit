import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';
import { Theme } from 'src/app/components/shared/theme';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from 'src/app/components/shared/settings';
import { SettingsService } from 'src/app/Services/settings.service';

@Component({
  selector: 'app-theme-search',
  templateUrl: './theme-search.component.html',
  styleUrls: ['./theme-search.component.css']
})
export class ThemeSearchComponent {
  Themes?: Theme[];
  Search: string="";
  Settings: Settings;

  constructor(private ThemeService: ThemeService, private translate:TranslateService, private settingsService:SettingsService) {
    this.Settings = settingsService.Settings
    this.settingsService.SettingsChange.subscribe((newSettings)=>{
      this.Settings = newSettings
    })
    this.retrieveThemes();
   }

   selectTheme(theme:Theme){
    var index = this.Themes?.indexOf(theme);

    if(index != undefined && index != -1){
      this.Settings.Theme = theme;
      this.settingsService.SaveSettings();
    }
   }

   retrieveThemes(): void {
    this.ThemeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.Themes = data;
    });
  }

}
