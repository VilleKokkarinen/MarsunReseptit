import { Component } from '@angular/core';
import { NgbDropdownMenu, NgbDropdownModule, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/auth.service';
import {RouterModule} from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SignUpModalComponent } from 'src/app/UI/modals/sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.css'],
  standalone: true,
	imports: [NgbDropdownModule, RouterModule, TranslateModule, NgbDropdownMenu ],
})
export class AccountDropdownComponent {  
  constructor(
    public authService: AuthService,
    private modalService: NgbModal,
    config: NgbModalConfig) {
    config.backdrop = 'static';
		config.keyboard = false;
  }

  userdata(){
    return JSON.stringify(this.authService.userData)
  }
  openSignUpModal() {
    const modalRef = this.modalService.open(SignUpModalComponent);
  }
}
