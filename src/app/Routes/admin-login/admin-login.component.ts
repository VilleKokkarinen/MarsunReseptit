import { Component } from '@angular/core';
import { PBAuthService } from 'src/app/Services/pb.auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  rememberMe:boolean;

  constructor(
    public authService: PBAuthService) {
      this.rememberMe = this.authService.GetRememberMe();
  }

  updateRememberMe(){
    this.authService.SetRememberMe(this.rememberMe);
  }
  
}
