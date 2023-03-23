import { Component } from '@angular/core';

import { Route } from 'src/app/components/shared/route';
import { TranslateService } from '@ngx-translate/core';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  public static Routes:Route[] = [
    {
      "Route":"Dashboard",
      "Name":"TXT_Dashboard",
      "Icon":"house",
      "Auth":false
    },
    {
      "Route":"Recipes",
      "Name":"TXT_Recipes",
      "Icon":"journals",
      "Auth":false
    },
    {
      "Route":"Add-Recipe",
      "Name":"TXT_Add_Recipe",
      "Icon":"journal-plus",
      "Auth":true
    },
    {
      "Route":"Themes",
      "Name":"TXT_Themes",
      "Icon":"journal-album",
      "Auth":false
    },
    {
      "Route":"Add-Theme",
      "Name":"TXT_Add_Theme",
      "Icon":"palette",
      "Auth":true
    }
  ]

  _Routes = SidebarComponent.Routes;
  isLoggedIn:boolean = false;

  constructor(private authService:PBAuthService) {
    this.isLoggedIn = authService.isLoggedIn;
  }
}
