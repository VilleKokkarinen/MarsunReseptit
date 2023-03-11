import { Component, QueryList, ViewChild } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { AuthService } from 'src/app/Services/auth.service';
import { RichTextEditorComponent } from 'src/app/UI/rich-text-editor/rich-text-editor.component';
import { ImageUploadComponent } from 'src/app/UI/image-upload/image-upload.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  ThumbnailImage:ImageUploadComponent|undefined;
  @ViewChild(ImageUploadComponent) set TI(ThumbnailImage: ImageUploadComponent) {
    this.ThumbnailImage = ThumbnailImage
  };

  RecipeTextEditor:RichTextEditorComponent|undefined;
  @ViewChild(RichTextEditorComponent) set RTE(RecipeTextEditor: RichTextEditorComponent) {
    this.RecipeTextEditor = RecipeTextEditor
  };
  recipe:Recipe;
  Mode:Boolean = false;
  submitted = false;
  

  constructor(
    private recipeService: RecipeService,
    private authservice:AuthService,
    private translate:TranslateService
    ) {
    this.recipe = new Recipe();
    if(authservice.isLoggedIn)
    this.recipe.Publisher = authservice.userData?.uid

    this.recipe.PublishDate = new Date;

    this.recipe.Description = "";
    this.recipe.Recipe = this.translate.instant('TXT_Recipe_Placeholder')
   }

  saveRecipe(): void {
    if(this.RecipeTextEditor)
    this.RecipeTextEditor.SaveImages();

    if(this.ThumbnailImage){
      this.ThumbnailImage.SaveImage();
    }
    
    this.recipeService.create(JSON.parse(JSON.stringify(this.recipe))).then(() => {
      this.submitted = true;
    });
    
  }

  newRecipe(): void {
    this.submitted = false;
    this.recipe = new Recipe();
  }

}
