import { Component } from '@angular/core';
import { Settings } from 'src/app/components/shared/settings';
import { SettingsService } from 'src/app/Services/settings.service';

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
  
  Settings:Settings|undefined|null;
  
  constructor(private settingsService:SettingsService){
    this.Settings = this.settingsService.Settings
  }
  
}
