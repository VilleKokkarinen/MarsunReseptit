import { Component } from '@angular/core';
import { BannerAd } from 'src/app/components/ads/bannerad';

@Component({
  selector: 'app-top-adbar',
  templateUrl: './top-adbar.component.html',
  styleUrls: ['./top-adbar.component.css']
})
export class TopAdbarComponent {
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
