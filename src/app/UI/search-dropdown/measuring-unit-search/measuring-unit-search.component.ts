import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MeasuringUnitService } from 'src/app/Services/measuringunit.service';
import { MeasuringUnit } from 'src/app/components/recipecomponents/measuringunit';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private measuringUnitService: MeasuringUnitService,  private translate:TranslateService) {
    this.retrieveMeasuringUnits();
   }

   selectMeasuringUnitData(){
    if(this.selectedMeasuringUnit == undefined || this.MeasuringUnits == undefined)
    return this.translate.instant("TXT_Select_Measuring_Unit");

    return this.selectedMeasuringUnit.Name
   }

   selectMeasuringUnit(unit:MeasuringUnit){
    var index = this.MeasuringUnits?.indexOf(unit);

    if(index != undefined && index != -1){
      this.selectedMeasuringUnit = unit;
      this.selectedMeasuringUnitChange.emit(this.selectedMeasuringUnit);
    }
   }

   retrieveMeasuringUnits(): void {
    this.measuringUnitService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.MeasuringUnits = data;
    });
  }


  createNewMeasuringUnit() {
    this.newMeasuringUnit = new MeasuringUnit();

    this.newMeasuringUnit.Name = "";
    this.newMeasuringUnit.ShortName = "";
    this.newMeasuringUnit.BaseUnitMultiplier = 1;

  }

   saveNewMeasuringUnit(): void {
    if(this.newMeasuringUnit != null){
      this.measuringUnitService.create(JSON.parse(JSON.stringify(this.newMeasuringUnit))).then((unitData:MeasuringUnit) => {
        this.newMeasuringUnit = null;
      });
    }  
  }
}
