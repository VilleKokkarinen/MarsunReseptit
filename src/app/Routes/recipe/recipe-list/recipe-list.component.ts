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
  Recipes:any[]=[];
  Search:string="";

  
  constructor(private recipeService: RecipeService, private router: Router) {
    this.retrieveRecipes();
 
   }

   retrieveRecipes(): void {
    this.recipeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.Recipes = data;
      console.log(data)
    });
  }

  gotoRecipe(recipe: any) {
    const recipeId = recipe ? recipe.id : null;
        
    this.router.navigate(['Recipes/'+recipeId]);
  }
}
