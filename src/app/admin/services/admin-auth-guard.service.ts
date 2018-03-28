import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.currentUser$
        .map(appUser => appUser.isAdmin);
  }

}
