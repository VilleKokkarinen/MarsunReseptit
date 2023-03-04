import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  FooterEnabled:Boolean = true;
  toggle(){
    this.FooterEnabled = !this.FooterEnabled;
  }
}
