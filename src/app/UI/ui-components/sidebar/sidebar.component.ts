import { Component } from '@angular/core';

import { Route } from 'src/app/components/shared/route';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  public Routes:Route[] = [
    {
      "Route":"Dashboard",
      "Name":"TXT_Dashboard",
      "Icon":"house"
    },
    {
      "Route":"Recipes",
      "Name":"TXT_Recipes",
      "Icon":"journals"
    },
    {
      "Route":"Add-Recipe",
      "Name":"TXT_Add_Recipe",
      "Icon":"journal-plus"
    },
    {
      "Route":"Add-Theme",
      "Name":"TXT_Add_Theme",
      "Icon":"palette"
    }
  ]
}
