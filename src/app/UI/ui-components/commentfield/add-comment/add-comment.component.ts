import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { RecipeComment } from 'src/app/components/recipecomponents/recipecomment';
import { RoadmapComment } from 'src/app/components/roadmapcomponents/roadmapcomment';
import { PublicUser } from 'src/app/components/shared/user';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { RecipeCommentService } from 'src/app/Services/recipe/recipecomment.service';
import { RoadmapCommentService } from 'src/app/Services/roadmap/roadmapcomment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() comment: RecipeComment|RoadmapComment|undefined;
  @Input() recipe: string = "";
  @Input() roadmap: string = "";
  currentUser:PublicUser|undefined;

  Date:Date = new Date;

  result:RecipeComment|null = null;
  @Output() resultChange = new EventEmitter<RecipeComment|RoadmapComment|null>()

  constructor(
    private recipeCommentService:RecipeCommentService,
    private roadmapCommentService:RoadmapCommentService,
    private authService:PBAuthService,
    private notifierService: NotifierService,
    private translate:TranslateService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userData;
    if(this.recipe != ""){
      this.comment = new RecipeComment();
      this.comment.recipe = this.recipe;
    }else if(this.roadmap != ""){
      this.comment = new RoadmapComment();
      this.comment.roadmap = this.roadmap;
    }
    
  }

  save(){
    if(this.comment != undefined && this.currentUser != undefined){
      this.comment.publisher = this.currentUser.id;
      this.comment.publishDate = this.Date;
    }else{
      this.notifierService.notify('error',  this.translate.instant('TXT_Authentication_Guard_Block'));
      return;
    }

    if(this.comment != undefined && this.recipe != "" && this.authService.userData.id != ""){
      this.recipeCommentService.create(this.comment as RecipeComment).then((data)=>{
        this.resultChange.emit(data);
        this.notifierService.notify('success',  this.translate.instant('TXT_Added_Comment'));
      })
    } else if(this.comment != undefined && this.roadmap != "" && this.authService.userData.id != ""){
      this.roadmapCommentService.create(this.comment as RoadmapComment).then((data)=>{
        this.resultChange.emit(data);
        this.notifierService.notify('success',  this.translate.instant('TXT_Added_Comment'));
      })
    }
  }
  
  cancel(){
    this.resultChange.emit(null);
  }
}
