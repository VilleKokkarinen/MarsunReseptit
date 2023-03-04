import { Component } from '@angular/core';
import { BannerAd } from 'src/app/components/ads/bannerad';

@Component({
  selector: 'app-adbar',
  templateUrl: './adbar.component.html',
  styleUrls: ['./adbar.component.css']
})
export class AdbarComponent {
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
