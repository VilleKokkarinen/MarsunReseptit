import { Component, QueryList, ViewChild } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { RichTextEditorComponent } from 'src/app/UI/rich-text-editor/rich-text-editor.component';
import { ImageUploadComponent } from 'src/app/UI/image-upload/image-upload.component';
import { TranslateService } from '@ngx-translate/core';
import { PBAuthService } from 'src/app/Services/pb.auth.service';

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
  submitted = false;
  

  constructor(
    private recipeService: RecipeService,
    private authservice:PBAuthService,
    private translate:TranslateService
    ) {
    this.recipe = new Recipe();
    
    this.recipe.description = "";
    this.recipe.recipe = this.translate.instant('TXT_Recipe_Placeholder')
   }

  saveRecipe(): void {
    if(this.RecipeTextEditor)
    this.RecipeTextEditor.SaveImages();

    if(this.ThumbnailImage){
      this.ThumbnailImage.SaveImage();
    }

    this.recipe.publisher = this.authservice.userData.id

    this.recipe.publishDate = new Date;
    this.recipeService.create(JSON.parse(JSON.stringify(this.recipe))).then(() => {
      this.submitted = true;
    });
    
  }

  newRecipe(): void {
    this.submitted = false;
    this.recipe = new Recipe();
  }

}
