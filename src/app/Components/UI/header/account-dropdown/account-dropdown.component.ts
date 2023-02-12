import { Component,ViewChild } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.css'],
  standalone: true,
	imports: [NgbDropdownModule],
})
export class AccountDropdownComponent {
  loggedIn = false;
  member = {userName:""};

  DDButtonText = this.loggedIn ? `Hi, ${this.member.userName}` : 'My Account'
  DropdownOpen:boolean = false;
}
