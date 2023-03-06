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
}
