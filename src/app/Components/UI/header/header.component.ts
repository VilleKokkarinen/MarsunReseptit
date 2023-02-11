import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedIn = false;
  member = {userName:""};

  DDButtonText = this.loggedIn ? `Hi, ${this.member.userName}` : 'My Account'
  DropdownOpen:boolean = false;
  
}
