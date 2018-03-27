export class AppCartItem {

  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;

  constructor(init?: Partial<AppCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
