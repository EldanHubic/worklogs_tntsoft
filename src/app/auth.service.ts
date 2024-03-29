import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  errorMessage: string = '';
  msgs: any[] = [];
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.userData = afAuth.authState;
  }

  addErrorMessages() {
    this.msgs = [
      {
        severity: 'error',
        summary: 'Error',
        detail: this.errorMessage,
      },
    ];
  }

  addSuccessRegisterMessage() {
    this.msgs = [
      {
        severity: 'success',
        summary: 'Success',
        detail: `You've succesfully signed up`,
      },
    ];
  }

  SignIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(`You're in!`, res);
        localStorage.setItem('user', JSON.stringify(res));
        email = '';
        password = '';
        this.router.navigate(['home/user-management']);
      })
      .catch((err) => {
        this.errorMessage = err.message;

        this.addErrorMessages();
      });
  }

  SignUp(
    email: string,
    password: string,
    displayName: string,
    photoURL: string
  ) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.addSuccessRegisterMessage();
        this.afs.collection('users').add({
          id: res.user?.uid,
          displayName: displayName,
          email: res.user?.email,
          photoURL: photoURL,
          emailVerified: res.user?.emailVerified,
          admin: false,
        });
        this.addSuccessRegisterMessage();
        setTimeout(() => this.router.navigate(['login']), 2000);
      })
      .catch((err) => {
        this.errorMessage = err.message;

        this.addErrorMessages();
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
        this.router.navigate(['login']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  signOut() {
    this.afAuth.signOut();
    localStorage.setItem('user', 'null');
    console.log('you are logged out');

    this.router.navigate(['login']);
  }
}
