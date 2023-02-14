import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/Components/shared/components/recipecomponents/ingredient/ingredient';

@Component({
  selector: 'app-recipe-step-ingredient-list',
  templateUrl: './recipe-step-ingredient-list.component.html',
  styleUrls: ['./recipe-step-ingredient-list.component.css']
})
export class RecipeStepIngredientListComponent {
  @Input() Ingredients:Ingredient[] = [];

  SelectIngredient: Ingredient|undefined;

  constructor(){
    console.log("adding ingredient constructor")
    //this.addIngredient();
  }  


  addIngredient(){
    if(this.SelectIngredient != undefined)
    this.newIngredient(this.SelectIngredient);
    //this.SelectIngredient = undefined;
  }

  newIngredient(ingredient:Ingredient){
    if(this.Ingredients == undefined)
    this.Ingredients = [];

    this.Ingredients.push(ingredient)
  }

  removeIngredient(ingredient:Ingredient): void{
    var index = this.Ingredients?.indexOf(ingredient);

    if(index != undefined && index != -1)
    this.Ingredients?.splice(index,1);
  }
 
}
