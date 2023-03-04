import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, UrlSegment } from '@angular/router';
import {tap, map, filter} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  AdBarEnabled:   Boolean = false;
  SidebarEnabled: Boolean = true; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    ) {
   
      router.events.subscribe((val) => {
        if(val instanceof NavigationEnd){
          if(val.url.endsWith("Recipes")){
            this.AdBarEnabled = true;
          }else{
            this.AdBarEnabled = false;
          }
        }
      })
  }
}
