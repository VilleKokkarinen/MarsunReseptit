import { Component } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe/recipe.service';
import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  Recipes:Recipe[]=[];
  Search:string="";

  userSearchUpdate = new Subject<string>();

  currentPage = 1;
  totalRecipes = 10;
  pageSize = 10;

  constructor(private recipeService: RecipeService, private router: Router) {
    this.retrieveRecipes();
 
    this.userSearchUpdate.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
        this.Recipes = [];
        this.retrieveRecipes();
      });
      
   }

   retrieveRecipes(): void {
    var filter = "";
    
    if(this.Search != "")
    filter = `name~'${this.Search}'`;

    this.recipeService.getList(this.currentPage,this.pageSize,filter).then((result)=>{
      this.totalRecipes = result.totalItems;

      this.Recipes = result.items;
    })
  }

  gotoRecipe(recipe: Recipe) {
    const recipeId = recipe ? recipe.id : null;
        
    this.router.navigate(['Recipes/'+recipeId]);
  }

  selectedPageChanged(page: number){
    this.currentPage = page;
    this.retrieveRecipes();
  }
}
