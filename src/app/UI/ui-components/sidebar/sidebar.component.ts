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
      "Auth":false,
      "Role":-1
    },
    {
      "Route":"Recipes",
      "Name":"TXT_Recipes",
      "Icon":"journals",
      "Auth":false,
      "Role":-1
    },
    {
      "Route":"Add-Recipe",
      "Name":"TXT_Add_Recipe",
      "Icon":"journal-plus",
      "Auth":true,
      "Role":2
    },
    {
      "Route":"Themes",
      "Name":"TXT_Themes",
      "Icon":"journal-album",
      "Auth":false,
      "Role":-1
    },
    {
      "Route":"Add-Theme",
      "Name":"TXT_Add_Theme",
      "Icon":"palette",
      "Auth":true,
      "Role":1
    },
    {
      "Route":"Roadmaps",
      "Name":"TXT_Roadmaps",
      "Icon":"terminal",
      "Auth":false,
      "Role":1
    },
    {
      "Route":"Add-Roadmap",
      "Name":"TXT_Add_Roadmap",
      "Icon":"terminal-plus",
      "Auth":true,
      "Role":2
    }
  ]

  _Routes = SidebarComponent.Routes;
  isLoggedIn:boolean = false;

  SideBarOpen:boolean = false;
  roleLevel:number = -1;

  constructor(private authService:PBAuthService) {
    this.isLoggedIn = authService.isLoggedIn;
    this.roleLevel = this.authService.UserRole;

    this.authService.AuthChange.subscribe(() => { // subscribe to login event
      this.isLoggedIn = this.authService.isLoggedIn;
      this.roleLevel = this.authService.UserRole;
    });
  }

  ToggleSideBar(){
    this.SideBarOpen = !this.SideBarOpen;
  }
  
}
