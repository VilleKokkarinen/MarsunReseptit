import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MeasuringUnitService } from 'src/app/Services/measuringunit.service';
import { MeasuringUnit } from 'src/app/components/recipecomponents/measuringunit';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { PBAuthService } from 'src/app/Services/pb.auth.service';

@Component({
  selector: 'app-measuring-unit-search',
  templateUrl: './measuring-unit-search.component.html',
  styleUrls: ['./measuring-unit-search.component.css']
})
export class MeasuringUnitSearchComponent {
  newMeasuringUnit:MeasuringUnit|null = null;
  @Input() selectedMeasuringUnit: MeasuringUnit|undefined;

  MeasuringUnits?: MeasuringUnit[];
  Search:string="";
  
  @Output() selectedMeasuringUnitChange = new EventEmitter<MeasuringUnit>()

  constructor(private measuringUnitService: MeasuringUnitService, private translate:TranslateService, private authService:PBAuthService) {
    this.retrieveMeasuringUnits();
   }

   selectMeasuringUnitData(){
    if(this.selectedMeasuringUnit == undefined || this.MeasuringUnits == undefined)
    return this.translate.instant("TXT_Select_Measuring_Unit");

    return this.selectedMeasuringUnit.name
   }

   selectMeasuringUnit(unit:MeasuringUnit){
    var index = this.MeasuringUnits?.indexOf(unit);

    if(index != undefined && index != -1){
      this.selectedMeasuringUnit = unit;
      this.selectedMeasuringUnitChange.emit(this.selectedMeasuringUnit);
    }
   }

   retrieveMeasuringUnits(): void {
    var filter = "";
    
    if(this.Search != "")
    filter = `name~'${this.Search}'`;

    this.measuringUnitService.getList(1,10,filter).then((result)=>{
      this.MeasuringUnits = result.items;
    })
  }


  createNewMeasuringUnit() {
    this.newMeasuringUnit = new MeasuringUnit();
  }

   saveNewMeasuringUnit(): void {
    if(this.newMeasuringUnit != null){
      this.newMeasuringUnit.publishDate = new Date;
      this.newMeasuringUnit.publisher = this.authService.userData.id;

      this.measuringUnitService.create(JSON.parse(JSON.stringify(this.newMeasuringUnit))).then((unitData:MeasuringUnit) => {
        this.newMeasuringUnit = null;
      });
    }  
  }
}
