import { AppCartItem } from './app-cart-item';
import { FormGroup } from '@angular/forms';



export class AppOrder {

  datePlaced: number;
  items: any[];
  shipping;

  constructor(public userId: string, form: FormGroup, items: AppCartItem[]) {

    this.datePlaced = new Date().getTime();
    this.shipping = form.value;

    this.items = items.map(item => {
      return {
        product: {
          title: item.title,
          price: item.price,
          imageUrl: item.imageUrl
        },
        totalPrice: item.totalPrice,
        quantity: item.quantity
      };
    });
  }
}
