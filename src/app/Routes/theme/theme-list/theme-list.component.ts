import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/app/components/themecomponents/theme';
import { SettingsService } from 'src/app/Services/settings.service';
import { ThemeService } from 'src/app/Services/theme/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent {
  Themes:Theme[]=[];
  Search:string="";

  
  constructor(private themeservice: ThemeService, private router: Router, private settingsService:SettingsService) {
    this.retrieveThemes();
   }

   retrieveThemes(): void {
    var filter = "";
    
    if(this.Search != "")
    filter = `name~'${this.Search}'`;

    this.themeservice.getList(1,10,filter).then((result)=>{
      this.Themes = result.items;
    })
  }

  gotoTheme(theme: Theme) {
    const themeId = theme ? theme.id : null;
        
    this.router.navigate(['Themes/'+themeId]);
  }

  tryTheme(theme: Theme){
    this.themeservice.testTheme(theme);
  }

  selectTheme(theme:Theme){
    this.settingsService.Settings.Theme = theme;
    this.settingsService.SaveSettings();
   }
}
