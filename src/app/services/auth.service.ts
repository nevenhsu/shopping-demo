import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';


@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {}

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(value => {
          this.router.navigateByUrl('/');
        })
        .catch(err => {
          // Create an account
        });
  }

  get currentUser$(): Observable<AppUser> {
    return this.afAuth.authState
        .switchMap(user => {
              if (user) {
                return this.userService.get(user.uid);
              } else {
                return Observable.of(null);
              }
            }
        );
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
        .then(value => {
          console.log('JESS: Login success.', value);
        })
        .catch(err => {
          console.log('JESS: Login failed.', err);
        });
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  logout() {
    this.afAuth.auth.signOut()
        .then(() => {
          this.router.navigateByUrl('/');
        });
  }

}
