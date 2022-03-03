import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.userData = afAuth.authState;
  }

  SignIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(`You're in!`, res);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['home/user-management']);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  SignUp(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('You are Successfully signed up!', res);
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }

  signOut() {
    this.afAuth.signOut();
    localStorage.setItem('user', 'null');
    console.log('you are logged out');

    this.router.navigate(['login']);
  }
}
