import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private loading: boolean = false;
  private fsloading: boolean = false;
  private text:string = "";

  private totalRequests = 0;

  constructor(
    private translate:TranslateService
  ) { 
    this.text = translate.instant("TXT_Loading")
  }

  addRequest(){
    this.totalRequests++;
    this.setLoading(true);
  }

  reduceRequest(){
    this.totalRequests--;

    if(this.totalRequests == 0)
    this.setLoading(false);
  }

  stop(){
    this.totalRequests = 0;
    this.setLoading(false);
  }

  getText(){
    return this.text;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }

  setFSLoading(loading: boolean) {
    this.fsloading = loading;
  }

  getFSLoading(): boolean {
    return this.fsloading;
  }
}
