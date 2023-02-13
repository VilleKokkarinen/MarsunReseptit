import { Component } from '@angular/core';
import { RecipeService } from 'src/app/Components/shared/components/recipecomponents/recipe/recipe.service';
import { Recipe } from 'src/app/Components/shared/components/recipecomponents/recipe/recipe';
import { Step } from 'src/app/Components/shared/components/recipecomponents/step';
import { Ingredient } from 'src/app/Components/shared/components/recipecomponents/ingredient';
import { AuthService } from 'src/app/Components/shared/services/auth.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  recipe:Recipe;
  submitted = false;

  constructor(private recipeService: RecipeService, private authservice:AuthService) {
    this.recipe = new Recipe();
    //this.recipe.Steps = [];

    console.log(authservice.isLoggedIn)

    if(authservice.isLoggedIn)
    this.recipe.Publisher = authservice.userData?.uid

    this.recipe.PublishDate = new Date;
    this.addStep();
   }

  ngOnInit(): void {
  }

  saveRecipe(): void {
    console.log('Creating recipe', this.recipe)

    this.recipeService.create(JSON.parse(JSON.stringify(this.recipe))).then((recipeData:Recipe) => {
      console.log('Created new recipe successfully!', recipeData);
      this.submitted = true;
    });
  }

  newRecipe(): void {
    this.submitted = false;
    this.recipe = new Recipe();
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
      this.recipe.Steps.push(step)
    }  
  }

  removeStep(step:Step): void{
    var index = this.recipe.Steps.indexOf(step);

    if(index != undefined && index != -1)
    this.recipe.Steps.splice(index,1);
  }

  addIngredient(step:Step){
    if(step.Ingredients == undefined)
    step.Ingredients = [];

    var ingredient = new Ingredient();
    ingredient.Name = "";
    ingredient.Amount = 0;


    step.Ingredients.push(ingredient)
  }

  removeIngredient(step:Step, ingredient:Ingredient): void{
    var index = step.Ingredients?.indexOf(ingredient);

    if(index != undefined && index != -1)
    step.Ingredients?.splice(index,1);
  }
 
}
