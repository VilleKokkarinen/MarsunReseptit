import { Component } from '@angular/core';
import { BannerAd } from 'src/app/components/ads/bannerad';

@Component({
  selector: 'app-side-adbar',
  templateUrl: './side-adbar.component.html',
  styleUrls: ['./side-adbar.component.css']
})
export class SideAdbarComponent {
  bannerad: BannerAd;
  constructor(){
    this.bannerad = new BannerAd(
      'a-pub-1120436091721652',
      1073935566,
      'auto',
      true
    )
  }
}
