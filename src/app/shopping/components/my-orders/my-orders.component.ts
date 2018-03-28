import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { AppOrder } from '../../../shared/models/app-order';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders$: Observable<AppOrder[]>;
  userId: string;
  subscription: Subscription;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.getOrders();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getOrders() {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      this.userId = user.uid;
      this.orders$ = this.orderService.get(this.userId);
    });

  }

}
