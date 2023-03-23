import { Component } from '@angular/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-theme-test-modal',
  templateUrl: './theme-test-modal.component.html',
  styleUrls: ['./theme-test-modal.component.css']
})
export class ThemeTestModalComponent {
  constructor(public activeModal: NgbActiveModal) {
  }

  Close(){
    this.activeModal.close('ok');
  }
}
