import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';
import { Theme } from 'src/app/components/themecomponents/theme';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from 'src/app/components/settings/settings';
import { SettingsService } from 'src/app/Services/settings.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-theme-search',
  templateUrl: './theme-search.component.html',
  styleUrls: ['./theme-search.component.css']
})
export class ThemeSearchComponent {
  Themes?: Theme[];
  Search: string="";
  Settings: Settings;

  userSearchUpdate = new Subject<string>();

  constructor(private ThemeService: ThemeService, private translate:TranslateService, private settingsService:SettingsService) {
    this.Settings = settingsService.Settings
    this.settingsService.SettingsChange.subscribe((newSettings)=>{
      this.Settings = newSettings
    })
    this.retrieveThemes();

    this.userSearchUpdate.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(() => {
        this.retrieveThemes();
      });
   }

   selectTheme(theme:Theme){
    var index = this.Themes?.indexOf(theme);
    if(index != undefined && index != -1){
      this.Settings.Theme = theme;
      this.settingsService.SaveSettings();
    }
   }

   retrieveThemes(): void {
    var filter = "";
    
    if(this.Search != "")
    filter = `name~'${this.Search}'`;

    this.ThemeService.getList(1,10,filter).then((result)=>{
      this.Themes = result.items;
    })
  }

}
