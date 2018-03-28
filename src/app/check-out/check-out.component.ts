import { Component, OnInit } from '@angular/core';
import { CartsService } from '../services/carts.service';
import { AppCart } from '../models/app-cart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{

  cart$: Observable<AppCart>;

  constructor(private cartService: CartsService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }


}
