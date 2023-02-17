import { Component, Input } from '@angular/core';
import { Step } from 'src/app/components/recipecomponents/step';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-step-list',
  templateUrl: './recipe-step-list.component.html',
  styleUrls: ['./recipe-step-list.component.css']
})
export class RecipeStepListComponent {
@Input() Steps:Step[]=[];

constructor(){
  console.log("adding step constructor")
  this.addStep();
}


addStep(){
  var step = new Step();
  step.Ingredients = [];
  step.Name = "";
  
  this.newStep(step);
}

newSubStep(step:Step){
  if(step != undefined){
    if(step.SubSteps == undefined)
      step.SubSteps = [];

    step.SubSteps.push(new Step());
  }
}

newStep(step:Step): void{
  if(step != undefined){
    this.Steps.push(step)
  }  
}

removeStep(step:Step): void{
  var index = this.Steps.indexOf(step);

  if(index != undefined && index != -1)
  this.Steps.splice(index,1);
}
}
