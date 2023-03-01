import { Component } from '@angular/core';
import { BannerAd } from 'src/app/components/ads/bannerad';
import { Route } from 'src/app/components/shared/route';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  bannerad: BannerAd;
  constructor(){
    this.bannerad = new BannerAd(
      'a-pub-1120436091721652',
      1073935566,
      'auto',
      true
    )
  }
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
    },
    {
      "Route":"Add-Theme",
      "Icon":"palette"
    }
  ]

  public Ads:string[] = [
    "1"
  ]

}
