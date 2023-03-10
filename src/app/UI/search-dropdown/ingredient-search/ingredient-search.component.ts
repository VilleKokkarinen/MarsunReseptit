import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IngredientService } from 'src/app/Services/ingredient.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Ingredient } from 'src/app/components/recipecomponents/ingredient';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ingredient-search',
  templateUrl: './ingredient-search.component.html',
  styleUrls: ['./ingredient-search.component.css']
})
export class IngredientSearchComponent {
  newIngredient:Ingredient|null = null;
  @Input() selectedIngredient: Ingredient|undefined;

  Ingredients?: Ingredient[];
  Search:string="";
  
  @Output() selectedIngredientChange = new EventEmitter<Ingredient>()

  constructor(private ingredientService: IngredientService, private translate:TranslateService) {
    this.retrieveIngredients();
   }

   selectIngredientData(){
    if(this.selectedIngredient == undefined || this.Ingredients == undefined)
    return this.translate.instant("TXT_Select_Ingredient");

    return this.selectedIngredient.Name
   }

   selectIngredient(ingredient:Ingredient){
    var index = this.Ingredients?.indexOf(ingredient);

    if(index != undefined && index != -1){
      this.selectedIngredient = ingredient;
      this.selectedIngredientChange.emit(this.selectedIngredient);
    }
   }

   retrieveIngredients(): void {
    this.ingredientService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.Ingredients = data;
    });
  }


  createNewIngredient() {
    this.newIngredient = new Ingredient();
    this.newIngredient.Name = "";
  }

   saveNewIngredient(): void {
    if(this.newIngredient != null){
      this.ingredientService.create(JSON.parse(JSON.stringify(this.newIngredient))).then((unitData:Ingredient) => {
        this.newIngredient = null;
      });
    }  
  }
}
