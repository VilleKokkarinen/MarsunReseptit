import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roadmap } from 'src/app/components/roadmapcomponents/roadmap';
import { RoadmapComment } from 'src/app/components/roadmapcomponents/roadmapcomment';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { RoadmapService } from 'src/app/Services/roadmap/roadmap.service';
import { RoadmapCommentService } from 'src/app/Services/roadmap/roadmapcomment.service';
import { RichTextEditorComponent } from 'src/app/UI/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-roadmap-details',
  templateUrl: './roadmap-details.component.html',
  styleUrls: ['./roadmap-details.component.css']
})
export class RoadmapDetailsComponent {
  id:string = "";
  Roadmap:Roadmap|undefined;
  ShowComments:boolean = false;
  ShowEdit:boolean = false;
  Editing:boolean = false;
  AddingComment:boolean = false;
  Comments:RoadmapComment[] = [];

  RoadmapTextEditor:RichTextEditorComponent|undefined;
  @ViewChild(RichTextEditorComponent) set RTE(RoadmapTextEditor: RichTextEditorComponent) {
    this.RoadmapTextEditor = RoadmapTextEditor
  };
  
  constructor(
    private roadmapService: RoadmapService,
    private commentService:RoadmapCommentService,
    private route: ActivatedRoute,
    public router: Router,
    private authservice: PBAuthService
  ) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id != null){
        this.retrieveRoadmap();
      }
      else{
        this.router.navigate(['Roadmaps'])
      }
    });
  }

  isAdmin(){
    return this.authservice.isAdmin;
  }

  ToggleComment(){
    this.ShowComments = !this.ShowComments;

    if(this.ShowComments === true && this.Comments.length == 0){

      var fetchedComments:RoadmapComment[] = [];

      var ownComments = new Promise((resolve)=>{
        if(this.authservice.userData.id != ""){
          this.commentService.getList(1,5,`roadmap='${this.id}' && publisher='${this.authservice.userData.id}'`).then((data)=>{ // try to get current users comments on this roadmap
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

          this.commentService.getList(1,5,`roadmap='${this.id}' ${publishFilter}`).then((data)=>{ // try to get current users comments on this roadmap
            fetchedComments.push(...data.items);
            resolve("OK");
          },()=>{
            resolve("OK"); // even though failed, no comments from other users?
          })
        })
        othersComments.then(()=>{
          this.Comments.push(...fetchedComments);
          console.log(this.Comments)
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

  retrieveRoadmap(): void {
    this.roadmapService.getOne(this.id).then((data)=>{
      this.Roadmap = data;
      if(this.authservice.userData.id == this.Roadmap.publisher && this.Roadmap.publisher != "")
      this.ShowEdit = true;
    })
  }

  EditRoadmap(){
    this.Editing = true;
  }

  Cancel(){
    this.Editing = false;
  }

  saveRoadmap(): void {
    if(this.RoadmapTextEditor)
    this.RoadmapTextEditor.SaveImages();
    
    if(this.Roadmap != undefined){
      this.roadmapService.update(this.Roadmap).then((data) => {
        this.Roadmap = data;
      this.Editing = false;
      });
    }
  }
}
