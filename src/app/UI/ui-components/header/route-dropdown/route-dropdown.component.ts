import { Component } from '@angular/core';
import { Route } from 'src/app/components/shared/route';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-route-dropdown',
  templateUrl: './route-dropdown.component.html',
  styleUrls: ['./route-dropdown.component.css']
})
export class RouteDropdownComponent {
Routes:Route[] = SidebarComponent.Routes;

IsLoggedIn:boolean = false;

constructor(private authService:PBAuthService) {
  this.IsLoggedIn = authService.isLoggedIn;

  this.authService.AuthChange.subscribe(() => { // subscribe to login event
    this.IsLoggedIn = this.authService.isLoggedIn;
  });
}

}
