import { Component } from '@angular/core';
import { Route } from 'src/app/components/shared/route';

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
    },
    {
      "Route":"Add-Recipe",
      "Icon":"journal-plus"
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
