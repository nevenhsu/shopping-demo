import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { CartsService } from 'shared/services/carts.service';
import { AppCart } from 'shared/models/app-cart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<AppCart>;

  constructor(public auth: AuthService, private cartService: CartsService) {}

  async ngOnInit() {
    this.auth.currentUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
