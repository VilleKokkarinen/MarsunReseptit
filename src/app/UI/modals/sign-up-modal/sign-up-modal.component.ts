import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent {
  constructor(public activeModal: NgbActiveModal, private authService:AuthService) {
  }

  signUp(email:string,password:string){
    this.authService.SignUp(email,password).then(()=>{
      this.Close();
    })  
  }

  Close(){
    this.activeModal.close('ok');
  }
}
