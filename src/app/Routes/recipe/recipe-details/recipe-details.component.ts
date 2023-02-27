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
    var string = `{
      "Description": "<h1><u>Reseptipohja</u></h1><h1><br></h1><h1><br></h1><p><br></p><h2><u>Raaka-aineet:</u></h2><ul><li>200g x</li><li>2dl y</li><li>2tl z</li></ul><p><br></p><p><br></p><p><br></p><h2><u>Ohje:</u></h2><ol><li>Vatkaa x</li><li>Sulata y</li><li>Sekoita x + y + z</li><li>Paista 200'c 1h</li></ol><p><br></p><p><br></p><p><br></p><p><br></p>",
      "Mode": "Simple",
      "Name": "testiresepti-simple-25-02",
      "PublishDate": "2023-02-25T15:22:38.119Z",
      "Publisher": "jj9m0p8jGZe9x5CSBxnTF3Wn0Eo2",
      "Recipe": "<h1><u>Reseptipohja</u></h1><h1><br></h1><h1><br></h1><p><br></p><h2><u>Raaka-aineet:</u></h2><ul><li>200g x</li><li>2dl y</li><li>2tl z</li></ul><p><br></p><p><br></p><p><br></p><h2><u>Ohje:</u></h2><ol><li>Vatkaa x</li><li>Sulata y</li><li>Sekoita x + y + z</li><li>Paista 200'c 1h</li></ol><p><br></p><p><br></p><p><br></p><p><br></p>",
      "Steps": [],
      "Comments": [{"Message":"<h1><u>Comment MessageComment MessageComment MessageComment MessageComment MessageComment MessageComment MessageComment MessageComment MessageComment MessageComment MessageComment MessageComment MessageComment Message</u></h1>", "PublishDate": "2023-02-25T15:22:38.119Z", "Publisher": "jj9m0p8jGZe9x5CSBxnTF3Wn0Eo2"}],
      "id": "RVPJ9uQPtyglWsQkJeqH"
    }`

    this.Recipe = JSON.parse(string);

    /*

    this.recipeService.get(this.id).pipe(
    ).subscribe(data => {
      console.log(data)
      this.Recipe = data;
    });
    */
    
  }
}
