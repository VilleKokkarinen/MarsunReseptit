import { Component, OnInit } from '@angular/core';
import { BannerAd } from 'src/app/components/ads/bannerad';
import { environment } from 'src/environments/environment';
import postscribe from 'postscribe';

@Component({
  selector: 'app-top-adbar',
  templateUrl: './top-adbar.component.html',
  styleUrls: ['./top-adbar.component.css']
})
export class TopAdbarComponent{
  bannerad: BannerAd;
  showAd = environment.adsense.show;

  loadAPI: Promise<any>;

  constructor(){
    this.bannerad = new BannerAd(
      'ca-pub-1120436091721652',
      5143555393,
      'horizontal',
      false
    );

    this.loadAPI = new Promise((resolve) => {
    setTimeout(() => {
        this.loadScript();
        resolve(true);
    }, 100);
  });
  }

  public loadScript() {        
   // var test = '<script type="text/javascript" src="https://udbaa.com/bnr.php?section=Top&pub=116567&format=728x90&ga=g&bg=1"></script>'
    // postscribe('#top-adbar', test);
  }

}
