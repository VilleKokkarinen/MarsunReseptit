import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { RoadmapService } from 'src/app/Services/roadmap/roadmap.service';

@Component({
  selector: 'app-roadmap-search',
  templateUrl: './roadmap-search.component.html',
  styleUrls: ['./roadmap-search.component.css']
})
export class RoadmapSearchComponent implements OnInit {
  @Input() selectedOption: {key:number,value:string}|undefined;
  @Input() type:string = "";


  Options:{key:number,value:string}[] = [];
  Search:string="";
  
  @Output() selectedOptionChange = new EventEmitter<{key:number,value:string}>()

  constructor(private translate:TranslateService, private authService:PBAuthService) {   
  }

  ngOnInit(){
    if(this.type == "priority"){
      this.Options = RoadmapService.Priorities
    }else if(this.type == "status"){
      this.Options = RoadmapService.Statuses
    }else if(this.type == "type"){
      this.Options = RoadmapService.Types
    }
  }

  selectOptionData(){
    if(this.selectedOption == undefined || this.Options == undefined){
      if(this.type == "priority"){
        return this.translate.instant("TXT_Select_Priority");
      }else if(this.type == "status"){
        return this.translate.instant("TXT_Select_Status");
      }else if(this.type == "type"){
        return this.translate.instant("TXT_Select_Type");
      }
    }else{
      return this.translate.instant(this.selectedOption.value);
    }
  }

  selectOption(option:{key:number,value:string}){
    var index = this.Options?.indexOf(option);

    if(index != undefined && index != -1){
      this.selectedOption = option;
      this.selectedOptionChange.emit(this.selectedOption);
    }
  }

}
