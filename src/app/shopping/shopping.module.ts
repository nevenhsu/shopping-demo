import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShippingCardComponent } from './components/shipping-card/shipping-card.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';

import { AuthGuard } from 'shared/services/auth-guard.service';


const appRoutes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent},

  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    CartComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductsComponent,
    CheckOutComponent,
    ShippingCardComponent,
    ShippingFormComponent,
    ProductFilterComponent
  ]
})
export class ShoppingModule {
}
