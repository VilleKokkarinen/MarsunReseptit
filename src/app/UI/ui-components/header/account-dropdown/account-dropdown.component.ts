import { Component } from '@angular/core';
import { NgbDropdownMenu, NgbDropdownModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SignUpModalComponent } from 'src/app/UI/modals/sign-up-modal/sign-up-modal.component';
import { PBAuthService } from 'src/app/Services/pb.auth.service';
import { CommonModule } from '@angular/common';
import { AuthProviderInfo } from "pocketbase";
import { environment } from 'src/environments/environment';
import { PublicUser } from 'src/app/components/shared/user';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordModalComponent } from 'src/app/UI/modals/forgot-password-modal/forgot-password-modal.component';

@Component({
  selector: 'account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.css'],
  standalone: true,
	imports: [NgbDropdownModule, RouterModule, TranslateModule, NgbDropdownMenu, CommonModule, FormsModule ],
})
export class AccountDropdownComponent {  
  providers:AuthProviderInfo[] = [];
  redirectUrl:string = "";

  userData:PublicUser;

  rememberMe:boolean;

  constructor(
    public authService: PBAuthService,
    private modalService: NgbModal,
    config: NgbModalConfig) {
      this.rememberMe = this.authService.GetRememberMe();
      this.userData = this.authService.userData;

      this.authService.AuthChange.subscribe((data) => { // subscribe to login event
        this.userData = data;
      });  
      
      this.redirectUrl = environment.oauth.redirectUrl;

      config.backdrop = 'static';
      config.keyboard = false;
      this.authService.GetOAuthProviders().then((data)=>{
        this.providers = data;
      })
  }

  updateRememberMe(){
    this.authService.SetRememberMe(this.rememberMe);
  }

  setProvider(data:any){
    localStorage.setItem('provider', JSON.stringify(data));
  }

  openSignUpModal() {
    const modalRef = this.modalService.open(SignUpModalComponent);
  }

  openForgotPwModal(){
    const modalRef = this.modalService.open(ForgotPasswordModalComponent);
  }


}
