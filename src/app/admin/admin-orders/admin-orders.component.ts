import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AppOrder } from '../../models/app-order';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$: Observable<AppOrder[]>;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.orderService.getAll();
  }
  printOrder(order) {
    console.log(order);
  }

}
