import { Component } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { map } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  Recipes:Recipe[]=[];
  Search:string="";

  
  constructor(private recipeService: RecipeService, private router: Router) {
    this.retrieveRecipes();
 
   }

   retrieveRecipes(): void {
    var filter = "";
    
    if(this.Search != "")
    filter = `name~'${this.Search}'`;

    this.recipeService.getList(1,10,filter).then((result)=>{
      this.Recipes = result.items;
    })
  }

  gotoRecipe(recipe: Recipe) {
    const recipeId = recipe ? recipe.id : null;
        
    this.router.navigate(['Recipes/'+recipeId]);
  }
}
