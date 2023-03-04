import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  id:string = "";
  Recipe:Recipe|undefined;
  ShowComments:Boolean = false;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id != null){
        this.retrieveRecipes();
      }
      else{
        this.router.navigate(['recipes'])
      }
    });
  }

  AddComment(){
    
  }
  retrieveRecipes(): void {
    this.recipeService.get(this.id).pipe(
    ).subscribe(data => {
      this.Recipe = data;
    });
    
  }
}
