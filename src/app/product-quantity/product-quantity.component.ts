import { Component, Input, OnInit } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { AppCart } from '../models/app-cart';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: AppProduct;
  @Input('cart') cart: AppCart;

  ngOnInit() {}

  constructor(private cartsService: CartsService) { }

  addToCart() {
    this.cartsService.addProduct(this.product);
  }

  removeFromCart() {
    this.cartsService.removeProduct(this.product);
  }



}
