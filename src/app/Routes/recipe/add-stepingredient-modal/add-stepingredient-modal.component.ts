import { Component, Input } from '@angular/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { StepIngredient } from 'src/app/components/recipecomponents/stepingredient';

@Component({
  selector: 'app-add-stepingredient-modal',
  templateUrl: './add-stepingredient-modal.component.html',
  styleUrls: ['./add-stepingredient-modal.component.css']
})
export class AddStepIngredientModalComponent {
  @Input() StepIngredient:StepIngredient = new StepIngredient();
  
  constructor(public activeModal: NgbActiveModal) {
  }
}
