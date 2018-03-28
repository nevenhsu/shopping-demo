import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';

import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from 'shared/services/auth-guard.service';


const appRoutes: Routes = [
  {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule {
}
