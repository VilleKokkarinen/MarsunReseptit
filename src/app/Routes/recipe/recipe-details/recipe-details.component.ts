import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { RichTextEditorComponent } from 'src/app/UI/rich-text-editor/rich-text-editor.component';
import { ImageUploadComponent } from 'src/app/UI/image-upload/image-upload.component';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  id:string = "";
  Recipe:Recipe|undefined;
  ShowComments:Boolean = false;
  ShowEdit:Boolean = false;
  Editing:Boolean = false;

  RecipeTextEditor:RichTextEditorComponent|undefined;
  @ViewChild(RichTextEditorComponent) set RTE(RecipeTextEditor: RichTextEditorComponent) {
    this.RecipeTextEditor = RecipeTextEditor
  };

  ThumbnailImage:ImageUploadComponent|undefined;
  @ViewChild(ImageUploadComponent) set TI(ThumbnailImage: ImageUploadComponent) {
    this.ThumbnailImage = ThumbnailImage
  };
  
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    public router: Router,
    private authservice: AuthService
  ) { 
  }

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
      if(this.authservice.isLoggedIn && this.authservice.userData?.uid == this.Recipe?.Publisher && this.Recipe?.Publisher != "")
      this.ShowEdit = true;
    });    
  }

  EditRecipe(){
    this.Editing = true;
  }

  Cancel(){
    this.Editing = false;
  }

  saveRecipe(): void {
    if(this.RecipeTextEditor)
    this.RecipeTextEditor.SaveImages();

    
    if(this.ThumbnailImage){
      this.ThumbnailImage.SaveImage();
    }
    
    
    this.recipeService.update(this.id, JSON.parse(JSON.stringify(this.Recipe))).then(() => {
     // notify if ok?
     this.Editing = false;
    });
    
  }
}
