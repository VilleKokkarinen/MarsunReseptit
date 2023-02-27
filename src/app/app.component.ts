import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MarsunReseptit';

  localeOptions: { label: string; value: string }[] | undefined;
  selectedLocale: string | undefined;

  constructor(private modalService: NgbModal,private translate: TranslateService) {
  }

  ngOnInit() {
    this.selectedLocale = 'en';
    this.translate.setDefaultLang(this.selectedLocale);
    this.localeOptions = [
      { label: 'FI', value: 'fi' },
      { label: 'US', value: 'en' }
    ];

    this.useLocale( this.localeOptions[0] );
  }

  useLocale(option: any) {
    this.translate.use(option.value);
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
