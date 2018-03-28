import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CartsService } from './carts.service';
import { AppOrder } from '../models/app-order';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private cartService: CartsService) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    const clearResult = await this.cartService.clearAll().then(() => true);
    return clearResult ? result : null;
  }

  getAll() {
    return this.db.list<AppOrder>('/orders').valueChanges();
  }

  get(userId: string) {
    return this.db.list<AppOrder>('/orders').valueChanges().map<AppOrder[], AppOrder[]>(orders => {
      return orders.filter(order => order.userId === userId);
    });
  }

}
