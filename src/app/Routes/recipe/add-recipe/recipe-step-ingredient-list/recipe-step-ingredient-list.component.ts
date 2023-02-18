import { Component, Input } from '@angular/core';
import { StepIngredient } from 'src/app/components/recipecomponents/stepingredient';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddStepIngredientModalComponent } from '../../add-stepingredient-modal/add-stepingredient-modal.component';

@Component({
  selector: 'app-recipe-step-ingredient-list',
  templateUrl: './recipe-step-ingredient-list.component.html',
  styleUrls: ['./recipe-step-ingredient-list.component.css']
})
export class RecipeStepIngredientListComponent {
  @Input() StepIngredients:StepIngredient[] = [];

  SelectIngredient: StepIngredient|undefined;

  constructor(private modalService: NgbModal, config: NgbModalConfig){
    console.log("adding ingredient constructor")
    config.backdrop = 'static';
		config.keyboard = false;
  }  

  open() {
    if(this.SelectIngredient == undefined)
    this.SelectIngredient = new StepIngredient();

		const modalRef = this.modalService.open(AddStepIngredientModalComponent);
		modalRef.componentInstance.StepIngredient = this.SelectIngredient;

    modalRef.result.then((result) => {
      console.log(result);
      this.StepIngredients.push(result);
      this.SelectIngredient = undefined;
    }, (reason) => {
      console.log("error", reason)
      this.SelectIngredient = undefined;
    });
    
	}


  addIngredient(){
    this.StepIngredients.push(new StepIngredient());
  }

  newIngredient(ingredient:StepIngredient){
    if(this.StepIngredients == undefined)
    this.StepIngredients = [];

    this.StepIngredients.push(ingredient)
  }

  removeIngredient(ingredient:StepIngredient|undefined): void{
    if(ingredient != undefined){
      var index = this.StepIngredients?.indexOf(ingredient);

      if(index != undefined && index != -1)
      this.StepIngredients?.splice(index,1);
    } 
  } 
}
