import { Component } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { AuthService } from 'src/app/Services/auth.service';

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
    if(authservice.isLoggedIn)
    this.recipe.Publisher = authservice.userData?.uid

    this.recipe.PublishDate = new Date;
   }

  saveRecipe(): void {
    this.recipeService.create(JSON.parse(JSON.stringify(this.recipe))).then((recipeData:Recipe) => {
      this.submitted = true;
    });
  }

  newRecipe(): void {
    this.submitted = false;
    this.recipe = new Recipe();
  }

}
