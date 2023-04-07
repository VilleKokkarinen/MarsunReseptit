import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublicUserService } from 'src/app/Services/user/public-user.service';
import { PublicUser } from 'src/app/components/shared/user';
import { RecipeComment } from 'src/app/components/recipecomponents/recipecomment';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { RecipeCommentService } from 'src/app/Services/recipe/recipecomment.service';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { RoadmapComment } from 'src/app/components/roadmapcomponents/roadmapcomment';
import { RoadmapCommentService } from 'src/app/Services/roadmap/roadmapcomment.service';

@Component({
  selector: 'app-commentfield',
  templateUrl: './commentfield.component.html',
  styleUrls: ['./commentfield.component.css']
})
export class CommentfieldComponent implements OnInit {
  @Input() Comment: RecipeComment|RoadmapComment|undefined;
  PublicUser:PublicUser|undefined;
  
  ShowEdit:boolean = false;
  Editing:boolean = false;


  deleted:string|null = null;
  @Output() deletedComment = new EventEmitter<string|null>()
  
  constructor(
    private recipeCommentService:RecipeCommentService, 
    private roadmapCommentService:RoadmapCommentService,
    private UserService: PublicUserService,
    private authservice:PBAuthService,
    private notifierService: NotifierService,
    private translate:TranslateService) {
  }

  EditComment(){
    this.Editing = true;
  }

  Cancel(){
    this.Editing = false;
  }

  ngOnInit(){
    if(this.Comment != undefined){

    if(this.isAdmin()){
      this.ShowEdit = true;
      this.UserService.getOne(this.Comment.publisher).then(data => {
      this.PublicUser = data;
      })
    }
    else if(this.Comment.publisher == this.authservice.userData.id) {
      this.PublicUser = this.authservice.userData;
      this.ShowEdit = true;
    }else{
      this.UserService.getOne(this.Comment.publisher).then((data)=>{
        this.PublicUser = data;
        if(this.authservice.userData.id == this.PublicUser.id && this.PublicUser.id != "")
          this.ShowEdit = true;
        })
      }
    }
  }

  isAdmin(){
    return this.authservice.isAdmin;
  }
  
  updateComment(): void {
    const isRecipe = (this.Comment as any).recipe != undefined; // better way ?

    if(this.Comment != undefined && this.authservice.userData.id != "" && isRecipe){
      this.recipeCommentService.update(this.Comment as RecipeComment).then((data) => {
        this.Comment = data;
        this.Editing = false;
        this.notifierService.notify('success',  this.translate.instant('TXT_Edited_Comment'));
      });
    }else if(this.Comment != undefined && this.authservice.userData.id != "" && !isRecipe){
      this.roadmapCommentService.update(this.Comment as RoadmapComment).then((data) => {
        this.Comment = data;
        this.Editing = false;
        this.notifierService.notify('success',  this.translate.instant('TXT_Edited_Comment'));
      });
    }
  }

  deleteComment(): void {
    const isRecipe = (this.Comment as any).recipe != undefined;  // better way ?

    if(this.Comment != undefined && this.authservice.userData.id != "" && isRecipe){
      this.recipeCommentService.delete(this.Comment as RecipeComment).then(() => {
        this.Editing = false;
        this.notifierService.notify('success',  this.translate.instant('TXT_Deleted_Comment'));
        this.deletedComment.emit(this.Comment?.id);
      });
    } else if(this.Comment != undefined && this.authservice.userData.id != "" && !isRecipe){
      this.roadmapCommentService.update(this.Comment as RoadmapComment).then(() => {
        this.Editing = false;
        this.notifierService.notify('success',  this.translate.instant('TXT_Deleted_Comment'));
        this.deletedComment.emit(this.Comment?.id);
      });
    }
  }

}
