import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) { 

    var themeObject = {
      
    };


    this.loadTheme("");
  }

  loadTheme(theme:string){
    const head = this.document.getElementsByTagName('head')[0];
    const style = this.document.createElement('link');
    style.id = 'css-styling';
    style.rel = 'stylesheet';
    style.href = `${theme}`;
    head.appendChild(style);
  }
}
