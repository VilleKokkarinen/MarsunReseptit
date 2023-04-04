import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, UrlSegment } from '@angular/router';
import {tap, map, filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Settings } from 'src/app/components/settings/settings';
import { SettingsService } from 'src/app/Services/settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  SideAdBarEnabled: Boolean = false;
  TopAdBarEnabled: Boolean = false;
  Settings:Settings;
  showAd = environment.adsense.show;
  
  innerWidth:number = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private settingsService:SettingsService
    ) {
      this.Settings = this.settingsService.Settings
      
      this.settingsService.SettingsChange.subscribe((newSettings)=>{
        this.Settings = newSettings;
      })

      router.events.subscribe((val) => {
        if(val instanceof NavigationEnd){
          if(val.url.endsWith("Recipes") || val.url.endsWith("Themes") ){
            this.SideAdBarEnabled = true;
            this.TopAdBarEnabled = true;
          }else{
            this.SideAdBarEnabled = false;
            this.TopAdBarEnabled = false;
          }
        }
      })

      this.innerWidth = window.innerWidth;
  }

  GetHeight(){
    var pxAmount = 60; // header

    if(this.Settings.Show_Footer)
    pxAmount += 30;

    return `calc(100% - ${pxAmount}px)`;
  }

  GetContentMarginLeft(){
    var pxAmount = 0; // sidebar

    if(this.Settings.Show_Sidebar === true && this.innerWidth > 576)
    pxAmount += 26;

    return `${pxAmount}px !important`;
  }
}
