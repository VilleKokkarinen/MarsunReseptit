import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  TrendingRecipes:any[]=[];
  
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
      this.TrendingRecipes = data;
    });
  }

  gotoRecipe(recipe: any) {
    const recipeId = recipe ? recipe.id : null;
    
    this.router.navigate(['Recipes/'+recipeId]);
  }
}
