import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublicUserService } from 'src/app/Services/public-user.service';
import { PublicUser } from 'src/app/components/shared/user';
import { RecipeComment } from 'src/app/components/recipecomponents/recipecomment';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { RecipeCommentService } from 'src/app/Services/recipecomment.service';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-commentfield',
  templateUrl: './commentfield.component.html',
  styleUrls: ['./commentfield.component.css']
})
export class CommentfieldComponent implements OnInit {
  @Input() Comment: RecipeComment|undefined;
  PublicUser:PublicUser|undefined;
  
  ShowEdit:boolean = false;
  Editing:boolean = false;


  deleted:string|null = null;
  @Output() deletedComment = new EventEmitter<string|null>()
  
  constructor(
    private recipeCommentService:RecipeCommentService, 
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
    if(this.Comment != undefined)

      if(this.Comment.publisher == this.authservice.userData.id) {
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


  
  updateComment(): void {
    if(this.Comment != undefined && this.authservice.userData.id != ""){
      this.recipeCommentService.update(this.Comment).then((data) => {
        this.Comment = data;
        this.Editing = false;
        this.notifierService.notify('success',  this.translate.instant('TXT_Edited_Comment'));
      });
    }
  }

  deleteComment(): void {
    if(this.Comment != undefined && this.authservice.userData.id != ""){
      this.recipeCommentService.delete(this.Comment).then(() => {
        this.Editing = false;
        this.notifierService.notify('success',  this.translate.instant('TXT_Deleted_Comment'));
        this.deletedComment.emit(this.Comment?.id);
      });
    }
  }

}
