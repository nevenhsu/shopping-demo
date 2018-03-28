import { Component, OnInit, Input } from '@angular/core';
import { AppCart } from '../models/app-cart';

@Component({
  selector: 'app-shipping-card',
  templateUrl: './shipping-card.component.html',
  styleUrls: ['./shipping-card.component.css']
})
export class ShippingCardComponent implements OnInit {

  @Input('cart') cart: AppCart;

  constructor() { }

  ngOnInit() {
  }

}
