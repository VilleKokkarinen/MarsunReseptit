import { Component, ViewChild } from '@angular/core';
import { PublicUser } from 'src/app/components/shared/user';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { PrivateUserService } from 'src/app/Services/user/private-user.service';
import { PublicUserService } from 'src/app/Services/user/public-user.service';
import { ImageUploadComponent } from 'src/app/UI/image-upload/image-upload.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  userData:PublicUser = new PublicUser();

  userEmailVerified:boolean|undefined;

  ThumbnailImage:ImageUploadComponent|undefined;
  @ViewChild(ImageUploadComponent) set TI(ThumbnailImage: ImageUploadComponent) {
    this.ThumbnailImage = ThumbnailImage
  };
  
  constructor(private authService: PBAuthService, private privateUserService:PrivateUserService) {
    this.userData = this.authService.userData;
    this.privateUserService.getOne(this.userData.id).then((data)=>{
      this.userEmailVerified = data.verified
    })
  }

  Save(): void {
    if(this.userData.id != ""){
      if(this.ThumbnailImage){
        this.ThumbnailImage.SaveImage();
      }
      this.authService.userData = this.userData;
      this.authService.UpdatePublicUserData(this.userData);
    }
  }

  SendVerificationMail(){
    this.authService.ReSendVerificationMail();
  }
}
