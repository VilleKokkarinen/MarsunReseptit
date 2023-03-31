import { Component } from '@angular/core';
import { BannerAd } from 'src/app/components/ads/bannerad';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-adbar',
  templateUrl: './top-adbar.component.html',
  styleUrls: ['./top-adbar.component.css']
})
export class TopAdbarComponent {
  bannerad: BannerAd;
  showAd = environment.adsense.show;
  constructor(){
    this.bannerad = new BannerAd(
      'ca-pub-1120436091721652',
      5143555393,
      'horizontal',
      false
    )
  }
}
