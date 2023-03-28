import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe/recipe.service';
import { Recipe } from 'src/app/components/recipecomponents/recipe';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RichTextEditorComponent } from 'src/app/UI/rich-text-editor/rich-text-editor.component';
import { ImageUploadComponent } from 'src/app/UI/image-upload/image-upload.component';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { RecipeLikeService } from 'src/app/Services/recipe/recipelike.service';
import { RecipeLike } from 'src/app/components/recipecomponents/recipelike';
import { RecipeTotalLikesService } from 'src/app/Services/recipe/recipe_total_likes.service';
import { RecipeCommentService } from 'src/app/Services/recipe/recipecomment.service';
import { RecipeComment } from 'src/app/components/recipecomponents/recipecomment';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  id:string = "";
  Recipe:Recipe|undefined;
  ShowComments:boolean = false;
  ShowEdit:boolean = false;
  Editing:boolean = false;
  AllowUserToLike:boolean = false;
  AllowUserToDislike:boolean = false;
  LikeData:RecipeLike|undefined;
  Likes:number = 0;
  
  AddingComment:boolean = false;

  Comments:RecipeComment[] = [];

  RecipeTextEditor:RichTextEditorComponent|undefined;
  @ViewChild(RichTextEditorComponent) set RTE(RecipeTextEditor: RichTextEditorComponent) {
    this.RecipeTextEditor = RecipeTextEditor
  };

  ThumbnailImage:ImageUploadComponent|undefined;
  @ViewChild(ImageUploadComponent) set TI(ThumbnailImage: ImageUploadComponent) {
    this.ThumbnailImage = ThumbnailImage
  };
  
  constructor(
    private recipeService: RecipeService,
    private recipeLikeService:RecipeLikeService,
    private recipeTotalLikesService:RecipeTotalLikesService,
    private commentService:RecipeCommentService,
    private route: ActivatedRoute,
    public router: Router,
    private authservice: PBAuthService
  ) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id != null){
        this.retrieveRecipe();
      }
      else{
        this.router.navigate(['Recipes'])
      }
    });

    this.recipeTotalLikesService.getOne(this.id).then(data => {
      this.Likes = data.likes;
    })

    this.recipeLikeService.HaveILikedThisRecipe(this.id).then(data => {
      if(data == null){
        this.AllowUserToLike = true
      }else{
        this.LikeData = data;
        this.AllowUserToDislike = true;
      }

    },()=>{ // error means, user has NOT liked the recipe yet
      this.AllowUserToLike = true
    })
  }

  isAdmin(){
    return this.authservice.isAdmin;
  }

  ToggleComment(){
    this.ShowComments = !this.ShowComments;

    if(this.ShowComments === true && this.Comments.length == 0){

      var fetchedComments:RecipeComment[] = [];

      var ownComments = new Promise((resolve)=>{
        if(this.authservice.userData.id != ""){
          this.commentService.getList(1,5,`recipe='${this.id}' && publisher='${this.authservice.userData.id}'`).then((data)=>{ // try to get current users comments on this recipe
            fetchedComments.push(...data.items);
            resolve("OK");
          },()=>{
            resolve("OK"); // even though failed, no comments from current user?
          })
        }else{
          resolve("OK")
        }
      })


      ownComments.then(()=>{
        var othersComments = new Promise((resolve)=>{
          var publishFilter = `&&publisher!='${this.authservice.userData.id}'`

          if(this.authservice.userData.id == "")
          publishFilter = '';

          this.commentService.getList(1,5,`recipe='${this.id}' ${publishFilter}`).then((data)=>{ // try to get current users comments on this recipe
            fetchedComments.push(...data.items);
            resolve("OK");
          },()=>{
            resolve("OK"); // even though failed, no comments from other users?
          })
        })
        othersComments.then(()=>{
          this.Comments.push(...fetchedComments);
        })
      })
    }
  }

  AddComment(){
    this.AddingComment = !this.AddingComment;
  }

  CommentAdded(result:any){
    if(result != null){
      this.Comments.splice(0,0,result);
    }
    this.AddingComment = false;
  }

  CommentDeleted(result:string|null){
    if(result != null){
      var index = this.Comments.findIndex(x => x.id == result);

      if(index != -1)
      {
        this.Comments.splice(index,1);
      }
    }
    this.AddingComment = false;
  }

  Like(){
    if(this.authservice.userData.id == "")
    {
      return;
    }

    var Like = new RecipeLike();
    Like.recipe = this.id;
    Like.publisher = this.authservice.userData.id;
    Like.publishDate = new Date;

    this.AllowUserToLike = false;

    this.recipeLikeService.create(Like).then((data)=>{
      this.LikeData = data;
      this.AllowUserToDislike = true;
      this.Likes ++;
    })
  }

  RemoveLike(){
    if(this.authservice.userData.id == "")
    {
      return;
    }

    if(this.LikeData != undefined){
      this.AllowUserToDislike = false;
      this.recipeLikeService.delete(this.LikeData).then(()=>{
        this.LikeData = undefined;
        this.AllowUserToLike = true;
        this.Likes --;
      })
    }
  }

  retrieveRecipe(): void {
    this.recipeService.getOne(this.id).then((data)=>{
      this.Recipe = data;
      if(this.authservice.userData.id == this.Recipe.publisher && this.Recipe.publisher != "")
      this.ShowEdit = true;
    })
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
    
    if(this.Recipe != undefined){
      this.recipeService.update(this.Recipe).then((data) => {
        this.Recipe = data;
      this.Editing = false;
      });
    }
  }
}
