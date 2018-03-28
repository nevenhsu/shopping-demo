import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppCart } from '../../../shared/models/app-cart';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { AppOrder } from '../../../shared/models/app-order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: AppCart;
  form: FormGroup;
  userId: string;
  order = {};
  userSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private orderServive: OrderService) { }

  ngOnInit() {
    this.buildForm();
    this.userSubscription = this.authService.currentUser$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async submitOrder() {
    if (!this.cart) {return; }

    this.order = new AppOrder(this.userId, this.form, this.cart.items);

    const result = await this.orderServive.placeOrder(this.order);
    if (result) {
      this.router.navigate(['/order-success', result.key]);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      name: '',
      address1: '',
      address2: '',
      city: ''
    });
  }
}
