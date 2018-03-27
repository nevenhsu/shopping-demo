import { Component, OnInit, Input } from '@angular/core';
import { AppProduct } from '../models/app-product';
import { CartsService } from '../services/carts.service';
import { AppCart } from '../models/app-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})


export class ProductCardComponent implements OnInit {

  @Input('product') product: AppProduct;
  @Input('showAction') showAction = true;
  @Input('cart') cart: AppCart;

  constructor(private cartsService: CartsService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartsService.addProduct(this.product);
  }

}
