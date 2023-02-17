import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/components/recipecomponents/ingredient';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddIngredientModalComponent } from '../../add-ingredient-modal/add-ingredient-modal.component';

@Component({
  selector: 'app-recipe-step-ingredient-list',
  templateUrl: './recipe-step-ingredient-list.component.html',
  styleUrls: ['./recipe-step-ingredient-list.component.css']
})
export class RecipeStepIngredientListComponent {
  @Input() Ingredients:Ingredient[] = [];

  SelectIngredient: Ingredient|undefined;

  constructor(private modalService: NgbModal, config: NgbModalConfig){
    console.log("adding ingredient constructor")
    //this.addIngredient();
    config.backdrop = 'static';
		config.keyboard = false;
  }  

  open() {
		const modalRef = this.modalService.open(AddIngredientModalComponent);
		modalRef.componentInstance.Ingredient = this.SelectIngredient;
	}


  addIngredient(){
    this.open();

    //if(this.SelectIngredient != undefined)
    //this.newIngredient(this.SelectIngredient);
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
