import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { PBAuthService } from '../Services/pb.auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(
    public authService: PBAuthService,
    public router: Router,
    private notifierService: NotifierService,
    private translate:TranslateService
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    /*
      -1: visitor
      0: user
      1: verified user
      2: publisher
      3: moderator
      4: admin
    */

    if(this.authService.UserRole <= 1) {
      this.notifierService.notify('error',  this.translate.instant('TXT_Role_Guard_Block'));
      this.router.navigate(["/Dashboard"]);
      return false;
    }else{
      return true;
    }
  }
}