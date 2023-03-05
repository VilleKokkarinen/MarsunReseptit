import { Injectable, NgZone } from '@angular/core';
import { PrivateUser, PublicUser } from '../components/shared/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ImageService } from './image.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetPrivateUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['Dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetPrivateUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);

    if(user !== null && this.userData == null)
      this.userData = user;


    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['Dashboard']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['Dashboard']);
        this.SetPrivateUserData(result.user);
        this.SetPublicUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetPrivateUserData(user: any) {
    const privateUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `private-users/${user.uid}`
    );  

    let privateUserData: PrivateUser = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };

    return privateUserRef.set(privateUserData, {
      merge: true,
    });  
  }

  SetImageServiceKey() {
    var user = this.userData;
    const privateUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `private-users/${user.uid}`
    );

    var imageServiceKey = ImageService.GenerateGuid(25);
    let privateUserData: PrivateUser = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      imageServiceKey: imageServiceKey
    };

    return privateUserRef.set(privateUserData, {
      merge: true,
    });  
  }

  GetImageServiceKey():Observable<string|undefined> {
    var user = this.userData;
    const privateUserRef: AngularFirestoreDocument<PrivateUser> = this.afs.doc(
      `private-users/${user.uid}`
    );
   
    return privateUserRef.snapshotChanges()
    .pipe(
      map(changes => {
        const data = changes.payload.data();
        return data?.imageServiceKey;
      }))
  }

  SetPublicUserData(user: any) {
    const publicUserRef: AngularFirestoreDocument<any> = this.afs.doc(
      `public-users/${user.uid}`
    );
    
    const publicUserData: PublicUser = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return publicUserRef.set(publicUserData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');

      this.userData=null;

      this.router.navigate(['Dashboard']);
    });
  }
}