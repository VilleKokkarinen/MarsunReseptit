import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UnitService } from 'src/app/Services/recipe/unit.service';
import { Unit } from 'src/app/components/recipecomponents/unit';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { PBAuthService } from 'src/app/Services/pb.auth.service';

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

  constructor(private UnitService: UnitService, private translate:TranslateService, private authService:PBAuthService) {
    this.retrieveUnits();
   }

   selectUnitData(){
    if(this.selectedUnit == undefined || this.Units == undefined)
    return this.translate.instant("TXT_Select_Unit");

    return this.selectedUnit.name
   }

   selectUnit(unit:Unit){
    var index = this.Units?.indexOf(unit);

    if(index != undefined && index != -1){
      this.selectedUnit = unit;
      this.selectedUnitChange.emit(this.selectedUnit);
    }
   }

   retrieveUnits(): void {
    var filter = "";
    
    if(this.Search != "")
    filter = `name~'${this.Search}'`;

    this.UnitService.getList(1,10,filter).then((result)=>{
      this.Units = result.items;
    })
  }


  createNewUnit() {
    this.newUnit = new Unit();
  }

   saveNewUnit(): void {
    if(this.newUnit != null){
      this.newUnit.publishDate = new Date;
      this.newUnit.publisher = this.authService.userData.id;

      this.UnitService.create(JSON.parse(JSON.stringify(this.newUnit))).then((unitData:Unit) => {
        this.newUnit = null;
      });
    }  
  }
}
