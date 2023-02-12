import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { Route } from './Route';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  public Routes:Route[] = [
    {
      "Route":"Dashboard",
      "Icon":"house"
    },
    {
      "Route":"Recipes",
      "Icon":"journals"
    }
  ]

  public Ads:Route[] = [
    {
      "Route":"Dashboard",
      "Icon":"house"
    },
    {
      "Route":"Recipes",
      "Icon":"journals"
    }
  ]

}
