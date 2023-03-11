import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/Services/theme.service';
import { Theme } from 'src/app/components/shared/theme';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-theme-search',
  templateUrl: './theme-search.component.html',
  styleUrls: ['./theme-search.component.css']
})
export class ThemeSearchComponent {
  @Input() selectedTheme: Theme|undefined;

  Themes?: Theme[];
  Search:string="";
  
  @Output() selectedThemeChange = new EventEmitter<Theme>()

  constructor(private ThemeService: ThemeService, private translate:TranslateService) {
    this.retrieveThemes();
   }

   selectThemeData(){
    if(this.selectedTheme == undefined || this.Themes == undefined)
    return this.translate.instant("TXT_Select_Theme");

    return this.selectedTheme.Name
   }

   selectTheme(theme:Theme){
    var index = this.Themes?.indexOf(theme);

    if(index != undefined && index != -1){
      this.selectedTheme = theme;
      this.selectedThemeChange.emit(this.selectedTheme);
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
