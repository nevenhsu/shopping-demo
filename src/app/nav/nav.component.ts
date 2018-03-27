import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { CartsService } from '../services/carts.service';
import { AppCart } from '../models/app-cart';
import { Observable } from 'rxjs/Observable';
import { AppCartItem } from '../models/app-cart-item';

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
