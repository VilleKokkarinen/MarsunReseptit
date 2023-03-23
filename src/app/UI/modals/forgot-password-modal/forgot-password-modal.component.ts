import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PBAuthService } from 'src/app/Services/pb.auth.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent {
  constructor(public activeModal: NgbActiveModal, private authService:PBAuthService) {
  }

  signUp(email:string){
    this.authService.requestPasswordReset(email).then(()=>{
      this.Close();
    })
  }

  Close(){
    this.activeModal.close('ok');
  }
}
