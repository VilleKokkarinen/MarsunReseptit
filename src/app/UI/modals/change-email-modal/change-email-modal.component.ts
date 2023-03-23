import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PBAuthService } from 'src/app/Services/pb.auth.service';

@Component({
  selector: 'app-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.css']
})
export class ChangeEmailModalComponent {
  constructor(public activeModal: NgbActiveModal, private authService:PBAuthService) {
  }

  changeEmail(email:string){
    if(this.authService.isLoggedIn){
      this.authService.requestEmailChange(email).then(()=>{
        this.Close();
      })
    }
  }

  Close(){
    this.activeModal.close('ok');
  }
}
