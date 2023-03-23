import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { PBAuthService } from '../Services/pb.auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    public authService: PBAuthService,
    public router: Router,
    private notifierService: NotifierService,
    private translate:TranslateService
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.isLoggedIn !== true) {
      console.log("Authentication Guard: you're not logged in.")
      this.notifierService.notify('error',  this.translate.instant('TXT_Authentication_Guard_Block'));
     return false;
    }

    return true;
  }
}