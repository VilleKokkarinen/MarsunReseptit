import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/app/components/themecomponents/theme';
import { ThemeService } from 'src/app/Services/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent {
  Themes:Theme[]=[];
  Search:string="";

  
  constructor(private themeservice: ThemeService, private router: Router) {
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

  gotoTheme(theme: any) {
    const themeId = theme ? theme.id : null;
        
    this.router.navigate(['Themes/'+themeId]);
  }
}
