import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IngredientService } from 'src/app/Services/recipe/ingredient.service';
import { Ingredient } from 'src/app/components/recipecomponents/ingredient';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { Subject } from 'rxjs';

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

  userSearchUpdate = new Subject<string>();

  constructor(private ingredientService: IngredientService, private translate:TranslateService, private authService:PBAuthService) {
    this.retrieveIngredients();

    this.userSearchUpdate.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(() => {
        this.retrieveIngredients();
      });
   }

   selectIngredientData(){
    if(this.selectedIngredient == undefined || this.Ingredients == undefined)
    return this.translate.instant("TXT_Select_Ingredient");

    return this.selectedIngredient.name
   }

   selectIngredient(ingredient:Ingredient){
    var index = this.Ingredients?.indexOf(ingredient);

    if(index != undefined && index != -1){
      this.selectedIngredient = ingredient;
      this.selectedIngredientChange.emit(this.selectedIngredient);
    }
   }

   retrieveIngredients(): void {
    var filter = "";
    
    if(this.Search != "")
    filter = `name~'${this.Search}'`;

    this.ingredientService.getList(1,10,filter).then((result)=>{
      this.Ingredients = result.items;
    })
  }


  createNewIngredient() {
    this.newIngredient = new Ingredient();
  }

   saveNewIngredient(): void {
    if(this.newIngredient != null){
      this.newIngredient.publishDate = new Date;
      this.newIngredient.publisher = this.authService.userData.id;

      this.ingredientService.create(this.newIngredient).then((unitData:Ingredient) => {
        this.newIngredient = null;
      });
    }  
  }
}
