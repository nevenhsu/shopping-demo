import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from './models/app-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    afAuth.authState.subscribe(user => {
      if (!user) {return; }
      userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) {return; }
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);

    });
  }
}
