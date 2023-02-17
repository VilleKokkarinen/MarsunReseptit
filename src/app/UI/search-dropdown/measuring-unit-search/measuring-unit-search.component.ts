import { Component, OnChanges, Input } from '@angular/core';
import { MeasuringUnitService } from 'src/app/Services/measuringunit.service';
import { AuthService } from 'src/app/Services/auth.service';
import { MeasuringUnit } from 'src/app/components/recipecomponents/measuringunit';
import { map } from 'rxjs/operators';

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
  

  constructor(private measuringUnitService: MeasuringUnitService, private authservice:AuthService) {
    this.retrieveMeasuringUnits();
   }

   selectMeasuringUnitData(){
    if(this.selectedMeasuringUnit == undefined || this.MeasuringUnits == undefined)
    return "Select Unit";

    return this.selectedMeasuringUnit.Name
   }

   selectMeasuringUnit(unit:MeasuringUnit){
    var index = this.MeasuringUnits?.indexOf(unit);

    if(index != undefined && index != -1){
      this.selectedMeasuringUnit = unit;
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
      console.log('Creating Measuring Unit', this.newMeasuringUnit)

      this.measuringUnitService.create(JSON.parse(JSON.stringify(this.newMeasuringUnit))).then((unitData:MeasuringUnit) => {
        console.log('Created new Measuring Unit successfully!', unitData);
        this.newMeasuringUnit = null;
      });
    }  
  }
}
