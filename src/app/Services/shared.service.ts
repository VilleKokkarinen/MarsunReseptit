import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }

  static waitFor(condition:any, callback:any, maxCallBacks:number = 10, sleep:number = 500) {
    if(!condition() || (maxCallBacks > 0 && !condition())) {
        maxCallBacks--;
        window.setTimeout(this.waitFor.bind(null, condition, callback, maxCallBacks), sleep);
    } else {
        callback();
    }
  }

  static numberAbbreviator(n:number,d:number) {
    var x=(''+n).length,p=Math.pow,d=p(10,d)
    x-=x%3
    return Math.round(n*d/p(10,x))/d+" kmgtpe"[x/3]
  }

  static scrollToBottom(id:string = "") {
      if(id == ""){
        setTimeout(() => {
        const maxScroll = document.getElementsByClassName('content')[0].scrollHeight;
        document.getElementsByClassName('content')[0].scrollTo({ top: maxScroll, behavior: 'smooth' });
      }, 50);
      }else{
        this.waitFor(()=> document.getElementById(id) !== null, () => {
          var element = document.getElementById(id);
          if(element != null){
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest"
              });
            }
        },50,70)
      }
  }
}
