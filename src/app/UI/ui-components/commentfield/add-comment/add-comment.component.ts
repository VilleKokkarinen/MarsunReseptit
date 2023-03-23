import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { RecipeComment } from 'src/app/components/recipecomponents/recipecomment';
import { PublicUser } from 'src/app/components/shared/user';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { RecipeCommentService } from 'src/app/Services/recipecomment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() comment: RecipeComment|undefined;
  @Input() recipe: string = "";
  currentUser:PublicUser|undefined;

  Date:Date = new Date;

  result:RecipeComment|null = null;
  @Output() resultChange = new EventEmitter<RecipeComment|null>()

  constructor(
    private recipeCommentService:RecipeCommentService, 
    private authService:PBAuthService,
    private notifierService: NotifierService,
    private translate:TranslateService
    ) {
   
  }

  ngOnInit(): void {
    this.currentUser = this.authService.userData;
    this.comment = new RecipeComment();
    this.comment.publisher = this.currentUser.id;
    this.comment.publishDate = this.Date;
    this.comment.recipe = this.recipe;
  }

  save(){
    if(this.comment != undefined && this.recipe != "" && this.authService.userData.id != ""){
      this.recipeCommentService.create(this.comment).then((data)=>{
        this.resultChange.emit(data);
        this.notifierService.notify('success',  this.translate.instant('TXT_Added_Comment'));
      })
    }
  }
  
  cancel(){
    this.resultChange.emit(null);
  }
}
