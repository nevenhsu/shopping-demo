import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppProduct } from '../models/app-product';
import 'rxjs/add/operator/take';
import { AppCart } from '../models/app-cart';

@Injectable()
export class CartsService {

  constructor(private db: AngularFireDatabase) { }



  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object<AppCart>('/carts/' + cartId).valueChanges().map(x => {
      return new AppCart(x.items);
    });
  }

  addProduct(product: AppProduct) {
    this.updateItem(product, 1);
  }

  removeProduct(product: AppProduct) {
    this.updateItem(product, -1);
  }

  async clearAll() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.create();
    cartId = result.key;
    localStorage.setItem('cartId', cartId);
    return cartId;
  }

  private async updateItem(product: AppProduct, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.id);

    item$.valueChanges().take(1).subscribe(item => {
      const quantity = item ? item['quantity'] : 0;
      const newVaule = quantity + change;
      if (newVaule <= 0 ) {
        item$.remove();
      } else {
        item$.update({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: newVaule});
      }
    });
  }

}
