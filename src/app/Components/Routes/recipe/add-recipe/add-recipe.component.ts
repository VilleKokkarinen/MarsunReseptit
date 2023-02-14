import { Component } from '@angular/core';
import { RecipeService } from 'src/app/Components/shared/components/recipecomponents/recipe/recipe.service';
import { Recipe } from 'src/app/Components/shared/components/recipecomponents/recipe/recipe';
import { Step } from 'src/app/Components/shared/components/recipecomponents/step';
import { Ingredient } from 'src/app/Components/shared/components/recipecomponents/ingredient/ingredient';
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

}
