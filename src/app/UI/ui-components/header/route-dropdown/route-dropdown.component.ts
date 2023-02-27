import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-route-dropdown',
  templateUrl: './route-dropdown.component.html',
  styleUrls: ['./route-dropdown.component.css']
})
export class RouteDropdownComponent {
Routes:any = new SidebarComponent().Routes;
}
