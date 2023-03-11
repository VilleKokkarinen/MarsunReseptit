import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-language-search',
  templateUrl: './language-search.component.html',
  styleUrls: ['./language-search.component.css']
})
export class LanguageSearchComponent {
  @Input() selectedLanguage: string = "en";
  selectedLanguageKey:string = "English";
  
  Languages:{key:string,value:string}[] = [
    {
      key:"English",
      value:"en"
    },
    {
      key:"Finnish",
      value:"fi"
    }
 ];

  Search:string="";
  
  @Output() selectedLanguageChange = new EventEmitter<string>()

  constructor() {
  }

  selectLanguageData(){
    return this.selectedLanguage
  }

  selectLanguage(language:string){
    var selected = this.Languages.find(x => x.key == language);

    if(selected != undefined){
        this.selectedLanguage = selected.value;
        this.selectedLanguageKey = selected.key;
        this.selectedLanguageChange.emit(this.selectedLanguage);
    }
  }
}
