import { Component } from '@angular/core';
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
          if(val.url.endsWith("Recipes")){
            this.SideAdBarEnabled = true;
            this.TopAdBarEnabled = true;
          }else{
            this.SideAdBarEnabled = false;
            this.TopAdBarEnabled = false;
          }
        }
      })
  }

  GetHeight(){
    var pxAmount = 60; // header

    if(this.Settings.Show_Footer)
    pxAmount += 30;

    return `calc(100% - ${pxAmount}px)`;
  }
}
