import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, UrlSegment } from '@angular/router';
import {tap, map, filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Settings } from 'src/app/components/shared/settings';
import { SettingsService } from 'src/app/Services/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  SideAdBarEnabled: Boolean = false;
  TopAdBarEnabled: Boolean = false;
  Settings:Settings|undefined|null;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private settingsService:SettingsService
    ) {
      this.Settings = this.settingsService.Settings
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
}
