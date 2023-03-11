import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/auth.service';
import {RouterModule} from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.css'],
  standalone: true,
	imports: [NgbDropdownModule, RouterModule, TranslateModule ],
})
export class AccountDropdownComponent {  
  constructor(
    public authService: AuthService
  ) { }
}
