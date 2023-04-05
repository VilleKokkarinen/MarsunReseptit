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
    },
    {
      "Route":"Roadmaps",
      "Name":"TXT_Roadmaps",
      "Icon":"terminal",
      "Auth":false
    },
    {
      "Route":"Add-Roadmap",
      "Name":"TXT_Add_Roadmap",
      "Icon":"terminal-plus",
      "Auth":true
    },
    {
      "Route":"Change-Log",
      "Name":"TXT_Change_Log",
      "Icon":"card-list",
      "Auth":false
    }
  ]

  _Routes = SidebarComponent.Routes;
  isLoggedIn:boolean = false;

  SideBarOpen:boolean = false;

  constructor(private authService:PBAuthService) {
    this.isLoggedIn = authService.isLoggedIn;

    this.authService.AuthChange.subscribe(() => { // subscribe to login event
      this.isLoggedIn = this.authService.isLoggedIn;
    });    

    
  }

  ToggleSideBar(){
    this.SideBarOpen = !this.SideBarOpen;
  }
}
