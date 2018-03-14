import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, {enableTracing: isDevMode()})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
