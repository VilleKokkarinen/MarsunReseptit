import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }

  static waitFor(condition:any, callback:any, maxCallBacks:number = 10) {
    if(!condition() || (maxCallBacks > 0 && !condition())) {
        maxCallBacks--;
        window.setTimeout(this.waitFor.bind(null, condition, callback, maxCallBacks), 500);
    } else {
        callback();
    }
  }

  static numberAbbreviator(n:number,d:number) {
    var x=(''+n).length,p=Math.pow,d=p(10,d)
    x-=x%3
    return Math.round(n*d/p(10,x))/d+" kmgtpe"[x/3]
  }

  static scrollToBottom() {
    setTimeout(() => { // make sure the new content is loaded before attempting to scroll down
      const maxScroll = document.getElementsByClassName('content')[0].scrollHeight;
      console.log(maxScroll);

      document.getElementsByClassName('content')[0].scrollTo({ top: maxScroll, behavior: 'smooth' });
    }, 25);
  }
}
