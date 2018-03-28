import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../../shared/services/carts.service';
import { Observable } from 'rxjs/Observable';
import { AppCart } from '../../../shared/models/app-cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart$: Observable<AppCart>;

  constructor(private cartService: CartsService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  clearAll() {
    this.cartService.clearAll();
  }

}
