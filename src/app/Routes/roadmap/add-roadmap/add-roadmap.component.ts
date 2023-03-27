import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Roadmap } from 'src/app/components/roadmapcomponents/roadmap';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { RoadmapService } from 'src/app/Services/roadmap/roadmap.service';

@Component({
  selector: 'app-add-roadmap',
  templateUrl: './add-roadmap.component.html',
  styleUrls: ['./add-roadmap.component.css']
})
export class AddRoadmapComponent {
  roadmap:Roadmap;

  priority:{key:number,value:string}|undefined;
  status:{key:number,value:string}|undefined;
  type:{key:number,value:string}|undefined;

  submitted = false;
  

  constructor(
    private roadmapService: RoadmapService,
    private authservice:PBAuthService,
    private translate:TranslateService,
    private notifierService: NotifierService
    ) {
    this.roadmap = new Roadmap();
   }

  saveRoadmap(): void {

    if(this.type == undefined){
      this.notifierService.notify('info', this.translate.instant('TXT_Select_Type'));
      return;
    }

    if((this.type?.key >= 4) && this.priority == undefined)
    {
      this.notifierService.notify('info', this.translate.instant('TXT_Select_Priority'));
      return;
    }
   

    this.roadmap.publisher = this.authservice.userData.id
    this.roadmap.publishDate = new Date;

    if(this.priority != undefined)
    this.roadmap.priority = this.priority.key;

    if(this.type != undefined)
    this.roadmap.priority = this.type.key;

    if(this.status != undefined)
    this.roadmap.priority = this.status.key;

   
    this.roadmapService.create(this.roadmap).then(() => {
      this.submitted = true;
      this.notifierService.notify('success', this.translate.instant('TXT_Saved_Succesfully'));
    });
    
  }

  newRoadmap(): void {
    this.submitted = false;
    this.roadmap = new Roadmap();
    this.priority = undefined;
    this.status = undefined;
    this.type = undefined;
  }

}
