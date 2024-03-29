import { EventEmitter, Injectable, Output } from '@angular/core';
import { PublicUser, UserRole } from '../components/shared/user';
import { Router } from '@angular/router';
import PocketBase, { AuthProviderInfo } from "pocketbase";
import { environment } from 'src/environments/environment';
import { PublicUserService } from './user/public-user.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { LoadingSpinnerService } from './loading-spinner.service';
import { AnalyticsService } from './analytics.service';
import { UserRoleService } from './user/user-role.service';
import { PrivateUserService } from './user/private-user.service';

@Injectable({
  providedIn: 'root',
})
export class PBAuthService {
  userData: PublicUser = new PublicUser() // Save logged in user data
  pb:PocketBase;

  rememberMe:boolean = false;

  private userIsAdmin: boolean = false;
  private userRole: number = -1;

  @Output() AuthChange = new EventEmitter<PublicUser>()
  
  constructor(
    public router: Router,
    private publicUserService:PublicUserService,
    private privateUserService: PrivateUserService,
    private userRoleService:UserRoleService,
    private notifierService: NotifierService,
    private translate:TranslateService,
    private loader:LoadingSpinnerService,
    private analyticsService: AnalyticsService
  ) {
    this.pb = new PocketBase(environment.pocketbaseUrl);
    this.GetRememberMe();

    this.pb.authStore.onChange(()=>{
      var promise = new Promise<PublicUser>((resolve)=>{
        var currentUser = this.pb.authStore.model;
        if(currentUser == null){ // if user signed out
          resolve(new PublicUser())
        }else{
          this.SetPublicUserData().then((userdata)=>{
            this.SetUserRole(userdata).then((userRole)=>{
              this.userRole = userRole.role;
              resolve(userdata);
            })
          },()=>{
            console.log("error authenticating user")
            this.notifierService.notify('error',  this.translate.instant('TXT_Authentication_Guard_Block'));
          })
        }
      });

      promise.then((data)=>{
        this.userData = data;

        if(data.id != ""){
          this.notifierService.notify('success', this.translate.instant('TXT_Login_Success'));
          this.SetLocalStorageUser();
        }
       
        this.AuthChange.emit(this.userData);
      })
    })

    if(this.rememberMe === true){
      const user = JSON.parse(localStorage.getItem('user')!);

      if(user !== null && this.userData.id == "")
        this.userData = user;
      
        if(this.userData.id != ""){
          this.pb.collection('users').authRefresh().then(()=>{
            // OK
          },()=>{
            this.pb.admins.authRefresh();
            this.userIsAdmin = true;
          })
        }
    }
  }

  get isLoggedIn(): boolean {
    return this.pb.authStore.isValid;
  }

  get isAdmin(): boolean {
    return this.userIsAdmin;
  }

  get UserRole(): number {
    return this.userRole;
  }

  AdminSignIn(email: string, password: string) {
    return new Promise((resolve, reject)=>{
      this.pb.admins.authWithPassword(email, password).then((data)=>{
        resolve("OK")
        this.userIsAdmin = true;
        this.router.navigate(['Dashboard']);
      },(error)=>{
        console.log(error)
        reject("Failed");
      })
    })
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return new Promise((resolve, reject)=>{
      this.loader.setFSLoading(true);
      this.pb.collection('users').authWithPassword(email, password).then(()=>{
        resolve("OK")
        this.loader.setFSLoading(false);
      },(error)=>{
        console.log(error)
        reject("Failed");
        this.loader.setFSLoading(false);
      })
    })
  }

   // Create user with email/password
   SignUp(email: string, password: string, passwordconfirm:string) {
    return new Promise((resolve, reject)=>{
      this.loader.setFSLoading(true);
      this.pb.collection('users').create({email, password, passwordConfirm: passwordconfirm}).then(()=>{

        this.notifierService.notify('success', this.translate.instant('TXT_Signup_success'));

        this.SendVerificationMail(email).then(()=>{
          this.SignIn(email,password).then(()=>{
            this.loader.setFSLoading(false);
            resolve("OK")
          },(error)=>{
            console.log(error)
            this.loader.setFSLoading(false);
          })
        },(error)=>{
          console.log(error)
          this.loader.setFSLoading(false);
        })
      },(error)=>{
        this.loader.setFSLoading(false);
        this.notifierService.notify('error', this.translate.instant('TXT_Signup_fail'));

        console.log(error)
        reject("Failed");
      })
    })
  }

  // Send email verification when new user sign up
  SendVerificationMail(email:string) {
    return new Promise((resolve, reject)=>{
    this.pb.collection('users').requestVerification(email).then(() => {
      this.notifierService.notify('info', this.translate.instant('TXT_Email_Verification_Sent'));
        resolve("OK")
      });
    })
  }

  ReSendVerificationMail() {
    return new Promise((resolve, reject)=>{
      var currentUser = this.pb.authStore.model;

      if(currentUser == null || currentUser.email == null){
        reject("no email address")
      } else {
      this.pb.collection('users').requestVerification(currentUser.email).then(() => {
        this.notifierService.notify('info', this.translate.instant('TXT_Email_Verification_Sent'));
          resolve("OK")
        },()=>{
          reject("failed")
        });
      }
    })
  }

  ConfirmVerification(token:string) {
    return new Promise((resolve, reject)=>{
      var currentUser = this.pb.authStore.model;

      if(currentUser == null || currentUser.email == null){
        reject("no email address")
      } else {
      this.pb.collection('users').confirmVerification(token).then(() => {
        this.notifierService.notify('success', this.translate.instant('TXT_Email_Verified'));

        if(this.userRole == 0 && currentUser != null){
          this.UpdateUserRole(1, currentUser.id)
        }

        this.router.navigate(['Dashboard']);
          resolve("OK")
        },(err)=>{
          console.log(err)
          reject("failed")
        });
      }
    })
  }

  requestPasswordReset(email:string) {
    return new Promise((resolve, reject)=>{
      this.pb.collection('users').requestPasswordReset(email).then(() => {
        this.notifierService.notify('info', this.translate.instant('TXT_Request_Password_Reset'));
        resolve("OK");
      });
    })
  }

  confirmPasswordReset(resetToken:string, newPassword:string, newPasswordConfirm:string) {
    this.pb.collection('users').confirmPasswordReset(resetToken,newPassword, newPasswordConfirm).then(() => {
      this.notifierService.notify('success', this.translate.instant('TXT_Confirm_Password_Reset'));
      this.router.navigate(['Dashboard']);
    });
  }

  requestEmailChange(newEmail:string) {
    return new Promise((resolve, reject)=>{
    this.pb.collection('users').requestEmailChange(newEmail).then(() => {
      resolve("OK");
      this.notifierService.notify('info', this.translate.instant('TXT_Request_Email_Change'));
    });
  })
  }

  confirmEmailChange(resetToken:string, password:string) {
    this.pb.collection('users').confirmEmailChange(resetToken,password).then(() => {
      this.notifierService.notify('success', this.translate.instant('TXT_Confirm_Email_Change'));
      this.router.navigate(['Dashboard']);
    });
  }

  async GetOAuthProviders():Promise<AuthProviderInfo[]>{
    return new Promise(async (resolve) => {
      await this.pb.collection('users').listAuthMethods().then((data)=>{
        resolve(data.authProviders);
      })
    })
  }

  SetPublicUserData():Promise<PublicUser> {
    return new Promise((resolve, reject)=>{
      var currentUser = this.pb.authStore.model;
      if(currentUser != null){
        this.publicUserService.getOne(currentUser.id).then((existing)=>{
          resolve(existing);
          // all good, current user has public user record in db.
        },(err)=>{ // current user is a new user, and needs to create public record.
          if(currentUser != null){
            const publicUserData: PublicUser = {
              id: currentUser.id,
              displayName: currentUser.id,
              avatar: currentUser.avatar,
              user: currentUser.id
            };
            this.publicUserService.create(publicUserData).then((data)=>{
              resolve(data);
            })
          }else{
            reject("not signed in")
          }
        })    
      }else{
        reject("not signed in")
      }
    })
  }

  SetUserRole(currentUser:PublicUser):Promise<UserRole> {
    return new Promise((resolve, reject)=>{
        this.userRoleService.getOne(currentUser.id).then((existing)=>{
          resolve(existing);
          // all good, current user has role record in db.
        },(err)=>{ // current user is a new user, and needs a role.
          if(currentUser != null){

            var data: UserRole = {
              id: currentUser.id,
              role: 0,
              user: currentUser.id
            };

            this.privateUserService.getOne(this.userData.id).then((pdata)=>{
              if(pdata.verified === true){
                data.role = 1;
              }
            }).finally(()=>{
              this.userRoleService.create(data).then((data)=>{
                resolve(data);
              })
            })
          }else{
            reject("not signed in")
          }
        })
    })
  }

  UpdateUserRole(role:number, id:string):Promise<UserRole> {
    return new Promise((resolve, reject)=>{
      var currentUser = this.pb.authStore.model;
      if(currentUser != null){
        const data: UserRole = {
          id: id,
          role: role,
          user: id
        };
        this.userRoleService.update(data).then((data)=>{
          resolve(data);
        })
      }else{
        reject("not signed in")
      }
    })
  }

  UpdatePublicUserData(user:PublicUser) {
    var currentUser = this.pb.authStore.model;
    if(currentUser != null && user.id == currentUser.id){
      this.publicUserService.update(user).then((data)=>{
        this.userData = data;
        this.notifierService.notify('success', this.translate.instant('TXT_Updated_Public_User_Data'));
        this.SetLocalStorageUser();
        this.AuthChange.emit(this.userData);
      },(err)=>{
        console.log(err);
        this.notifierService.notify('error', this.translate.instant('TXT_Failed_To_Update_Public_User_Data'));
      })
    }
  }

  SetLocalStorageUser(){
    if(this.rememberMe === true){
      localStorage.setItem('user', JSON.stringify(this.userData as PublicUser));
    }else{
      localStorage.removeItem('user');
    }
  }

  GetRememberMe():boolean{
    var value = JSON.parse(localStorage.getItem('rememberMe')!);

    var result = false;
    if(value !== null){
      result = value;
    }
    else{
      result = false;
    }

    if(result === false){
      localStorage.removeItem('user');
    }
 
    
    this.rememberMe = result;
    return result;
  }

  SetRememberMe(value:boolean){
    this.rememberMe = value;
    
    localStorage.setItem('rememberMe', JSON.stringify(this.rememberMe));
  }

  // Sign in with OAuth
  OAuth(providerName:string, code:string, codeVerifier:string, redirectUrl:string) {
     this.pb.collection("users").authWithOAuth2(providerName, code, codeVerifier, redirectUrl).then(() => {
      localStorage.removeItem('provider');
      this.router.navigate(['Dashboard']);
    });
  }

  // Sign out
  SignOut() {
    this.userData = new PublicUser();
    this.pb.authStore.clear();

    this.router.navigate(['Dashboard']);
    localStorage.removeItem('provider');
    localStorage.removeItem('user');
    localStorage.removeItem('pocketbase_auth');
    localStorage.removeItem('rememberMe');
    this.rememberMe = false;

  }
}