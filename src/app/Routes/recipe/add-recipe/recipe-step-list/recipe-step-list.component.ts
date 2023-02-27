import { Component, Input } from '@angular/core';
import { Step } from 'src/app/components/recipecomponents/step';

@Component({
  selector: 'app-recipe-step-list',
  templateUrl: './recipe-step-list.component.html',
  styleUrls: ['./recipe-step-list.component.css']
})
export class RecipeStepListComponent {
@Input() Steps:Step[]=[];
hiddenSteps:number[] = [];

constructor(){
  this.addStep();
}

toggle(i:number){
  if(!this.hiddenSteps.includes(i)){
    this.hiddenSteps.push(i);
  }else{
    this.hiddenSteps.splice(this.hiddenSteps.indexOf(i),1);
  }
}

addStep(){
  var step = new Step();
  step.Ingredients = [];
  step.Name = "";
  step.Description ="<h1><u>Vaihepohja</u></h1><h1><br></h1><p><br></p><h2><u>Ohje:</u></h2><ol><li>Vatkaa x</li><li>Sulata y</li><li>Sekoita x + y + z</li><li>Paista 200'c 1h</li></ol><p><br></p><p><br></p><p><br></p><p><br></p>";
  
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
    this.hiddenSteps = [];
    for(var i = 0; i < this.Steps.length-1; i ++){
      this.hiddenSteps.push(i);
    }
  }  
}

removeStep(step:Step): void{
  var index = this.Steps.indexOf(step);

  if(index != undefined && index != -1)
  this.Steps.splice(index,1);
}
}
