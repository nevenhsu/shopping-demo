import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { AppProduct } from 'shared/models/app-product';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products: AppProduct[];
  productResource: DataTableResource<AppProduct>;
  items: AppProduct[] = [];
  itemCount = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe( value => {
      this.products = value;
      this.initDataTable(this.products);
    });
  }

  initDataTable(products) {
    this.productResource = new DataTableResource(products);
    this.productResource.query({offset: 0, limit: 10}).then( val => this.items = val );
    this.productResource.count().then((number) => this.itemCount = number);
  }

  reload(params) {
    if (!this.productResource) {return; }
    this.productResource.query(params).then(items => this.items = items );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    const filterProducts = query ? this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
    this.initDataTable(filterProducts);
  }

}
