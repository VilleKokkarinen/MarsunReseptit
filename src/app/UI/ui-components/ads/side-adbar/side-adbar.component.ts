import { Component } from '@angular/core';
import { BannerAd } from 'src/app/components/ads/bannerad';
import { environment } from 'src/environments/environment';
import postscribe from 'postscribe';

@Component({
  selector: 'app-side-adbar',
  templateUrl: './side-adbar.component.html',
  styleUrls: ['./side-adbar.component.css']
})
export class SideAdbarComponent {
  bannerad: BannerAd;
  showAd = environment.adsense.show;

  
  loadAPI: Promise<any>;

  constructor(){
    this.bannerad = new BannerAd(
      'ca-pub-1120436091721652',
      1073935566,
      'auto',
      true
    )

    this.loadAPI = new Promise((resolve) => {
      setTimeout(() => {
          this.loadScript();
          resolve(true);
      }, 100);
    });
    }
  
    public loadScript() {        
      /*var test = '<script type="text/javascript" src="https://udbaa.com/bnr.php?section=Right&pub=116567&format=120x600&ga=g&bg=1"></script>'
  
      postscribe('#side-adbar', test);*/
    }
}
