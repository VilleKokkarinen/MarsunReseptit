import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Roadmap } from 'src/app/components/roadmapcomponents/roadmap';
import { RoadmapService } from 'src/app/Services/roadmap/roadmap.service';

@Component({
  selector: 'app-roadmap-list',
  templateUrl: './roadmap-list.component.html',
  styleUrls: ['./roadmap-list.component.css']
})
export class RoadmapListComponent {
  Roadmaps:Roadmap[]=[];
  Search:string="";
  
  Priorities:{key:number,value:string}[] = [];
  Types:{key:number,value:string}[] = [];
  Statuses:{key:number,value:string}[] = [];

  constructor(private roadmapService: RoadmapService, private router: Router,private translate:TranslateService) {
    this.retrieveRoadmaps();
 
    this.Priorities = RoadmapService.Priorities
    this.Types = RoadmapService.Types
    this.Statuses = RoadmapService.Statuses

   }

   PriorityText(key:number):string{
    var item = this.Priorities.find(x => x.key == key);

    if(item){
      return this.translate.instant(item.value);
    }
    return "";
   }

   TypeText(key:number):string{    
    var item = this.Types.find(x => x.key == key);

    if(item){
      return this.translate.instant(item.value);
    }
    return "";
   }

   StatusText(key:number):string{
    var item = this.Statuses.find(x => x.key == key);

    if(item){
      return this.translate.instant(item.value);
    }
    return "";
   }

   retrieveRoadmaps(): void {
    var filter = "";
    
    if(this.Search != "")
    filter = `name~'${this.Search}'`;

    this.roadmapService.getList(1,10,filter).then((result)=>{
      this.Roadmaps = result.items;
    })
  }

  gotoRoadmap(roadmap: Roadmap) {
    const roadmapId = roadmap ? roadmap.id : null;
        
    this.router.navigate(['Roadmaps/'+roadmapId]);
  }
}
