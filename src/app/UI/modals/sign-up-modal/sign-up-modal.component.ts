import { Component } from '@angular/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { PBAuthService } from 'src/app/Services/pb.auth.service';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent {
  constructor(public activeModal: NgbActiveModal, private authService:PBAuthService) {
  }

  signUp(email:string,password:string,passwordconfirm:string){
    this.authService.SignUp(email,password, passwordconfirm).then(()=>{
      this.Close();
    })  
  }

  Close(){
    this.activeModal.close('ok');
  }
}
