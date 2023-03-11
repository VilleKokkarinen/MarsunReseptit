import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { BannerAd } from '../../../../components/ads/bannerad';

@Component({
  selector: 'app-bannerad',
  templateUrl: './bannerad.component.html',
  styleUrls: ['./bannerad.component.css']
})
export class BannerAdComponent {

  @Input() banner: BannerAd|undefined;
  showAd = environment.adsense.show;
      constructor() {    }
  
      ngAfterViewInit() {
          setTimeout(() => {
              try {

                  ((window as { [key: string]: any })["adsbygoogle"] = (window as { [key: string]: any })["adsbygoogle"] || []).push({
                      overlays: {bottom: true}
                  });
              } catch (e) {
                  console.error(e);
              }
          }, 0);
      }
  
}
