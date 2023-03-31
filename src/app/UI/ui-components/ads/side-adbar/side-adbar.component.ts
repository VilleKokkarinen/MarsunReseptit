import { Component } from '@angular/core';
import { BannerAd } from 'src/app/components/ads/bannerad';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-side-adbar',
  templateUrl: './side-adbar.component.html',
  styleUrls: ['./side-adbar.component.css']
})
export class SideAdbarComponent {
  bannerad: BannerAd;
  showAd = environment.adsense.show;
  constructor(){
    this.bannerad = new BannerAd(
      'ca-pub-1120436091721652',
      1073935566,
      'auto',
      true
    )
  }
}
