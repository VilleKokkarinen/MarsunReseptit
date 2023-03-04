import { Component, QueryList, ViewChild } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { AuthService } from 'src/app/Services/auth.service';
import { RichTextEditorComponent } from 'src/app/UI/rich-text-editor/rich-text-editor.component';
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  child:RichTextEditorComponent|undefined;
  @ViewChild(RichTextEditorComponent)
  set appShark(child: RichTextEditorComponent) {
    this.child = child
  };
  recipe:Recipe;
  Mode:Boolean = false;
  submitted = false;
  

  constructor(private recipeService: RecipeService, private authservice:AuthService) {
    this.recipe = new Recipe();
    if(authservice.isLoggedIn)
    this.recipe.Publisher = authservice.userData?.uid

    this.recipe.PublishDate = new Date;

    this.recipe.Description = "Description";
    this.recipe.Recipe = "<h1><u>Reseptipohja</u></h1><h1><br></h1><h1><br></h1><p><br></p><h2><u>Raaka-aineet:</u></h2><ul><li>200g x</li><li>2dl y</li><li>2tl z</li></ul><p><br></p><p><br></p><p><br></p><h2><u>Ohje:</u></h2><ol><li>Vatkaa x</li><li>Sulata y</li><li>Sekoita x + y + z</li><li>Paista 200'c 1h</li></ol><p><br></p><p><br></p><p><br></p><p><br></p>";
   }

  saveRecipe(): void {

    if(this.child)
    this.child.SaveImages();
    
    this.recipeService.create(JSON.parse(JSON.stringify(this.recipe))).then((recipeData:Recipe) => {
      this.submitted = true;
    });
    
  }

  newRecipe(): void {
    this.submitted = false;
    this.recipe = new Recipe();
  }

}
