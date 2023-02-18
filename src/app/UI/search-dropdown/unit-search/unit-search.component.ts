import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UnitService } from 'src/app/Services/unit.service';
import { Unit } from 'src/app/components/recipecomponents/unit';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-unit-search',
  templateUrl: './unit-search.component.html',
  styleUrls: ['./unit-search.component.css']
})
export class UnitSearchComponent {
  newUnit:Unit|null = null;
  @Input() selectedUnit: Unit|undefined;

  Units?: Unit[];
  Search:string="";
  
  @Output() selectedUnitChange = new EventEmitter<Unit>()

  constructor(private UnitService: UnitService) {
    this.retrieveUnits();
   }

   selectUnitData(){
    if(this.selectedUnit == undefined || this.Units == undefined)
    return "Select Unit";

    return this.selectedUnit.Name
   }

   selectUnit(unit:Unit){
    var index = this.Units?.indexOf(unit);

    if(index != undefined && index != -1){
      this.selectedUnit = unit;
      this.selectedUnitChange.emit(this.selectedUnit);
    }
   }

   retrieveUnits(): void {
    this.UnitService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.Units = data;
    });
  }


  createNewUnit() {
    this.newUnit = new Unit();

    this.newUnit.Name = "";
    this.newUnit.ShortName = "";
    this.newUnit.BaseUnitMultiplier = 1;

  }

   saveNewUnit(): void {
    if(this.newUnit != null){
      console.log('Creating  Unit', this.newUnit)

      this.UnitService.create(JSON.parse(JSON.stringify(this.newUnit))).then((unitData:Unit) => {
        console.log('Created new  Unit successfully!', unitData);
        this.newUnit = null;
      });
    }  
  }
}
