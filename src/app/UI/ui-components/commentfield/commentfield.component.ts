import { Component, Input } from '@angular/core';
import { PublicUserService } from 'src/app/Services/public-user.service';
import { PublicUser } from 'src/app/components/shared/user';
import { Comment } from 'src/app/components/recipecomponents/comment';

@Component({
  selector: 'app-commentfield',
  templateUrl: './commentfield.component.html',
  styleUrls: ['./commentfield.component.css']
})
export class CommentfieldComponent {
  @Input() Comment: Comment|undefined;
  PublicUser:PublicUser|undefined;

  constructor(private UserService: PublicUserService) {
  }

  ngOnInit(){
  this.retrieveUserName();
  }

  retrieveUserName(): void {
    if(this.Comment?.Publisher != null){
      this.UserService.get(this.Comment.Publisher).pipe(
        ).subscribe(data => {
          this.PublicUser = data;
        });
    }
  }

}
