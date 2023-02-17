import { Component, Input } from '@angular/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { Ingredient } from 'src/app/components/recipecomponents/ingredient';

@Component({
  selector: 'app-add-ingredient-modal',
  templateUrl: './add-ingredient-modal.component.html',
  styleUrls: ['./add-ingredient-modal.component.css']
})
export class AddIngredientModalComponent {
  @Input() Ingredient:Ingredient|undefined;
  
  constructor(public activeModal: NgbActiveModal) {

  }
}
