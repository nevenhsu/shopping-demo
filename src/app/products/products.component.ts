import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from '../models/app-product';
import { CartsService } from '../services/carts.service';
import { Subscription } from 'rxjs/Subscription';
import { AppCart } from '../models/app-cart';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productSubscription: Subscription;
  products: AppProduct[] = [];
  filterProducts: AppProduct[] = [];
  cart$: Observable<AppCart>;
  query: string;


  constructor(private productService: ProductService,
              private cartService: CartsService,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    this.populateProducts();
    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  populateProducts() {
    this.productSubscription = this.productService.getAll().subscribe(products => this.filterProducts = this.products = products);
    this.filteringProducts();
  }

  filteringProducts() {
    this.route.queryParamMap.subscribe(params => {
      this.query = params.get('category');

      this.filterProducts = this.query ?
          this.products.filter(product => product.category === this.query) :
          this.products;
    });
  }

}
