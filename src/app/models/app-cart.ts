import { AppCartItem } from './app-cart-item';
import { AppProduct } from './app-product';

export class AppCart {

  items: AppCartItem[];

  constructor(private itemsMap: {}) {
    // Todo: Cannot convert undefined or null to object typescript
    itemsMap = itemsMap || {};
    this.items = Object.keys(itemsMap).map(id => new AppCartItem({id: id, ...itemsMap[id]}));
  }

  get totalPrice() {
    let priceCounter = 0;
    this.items.forEach(item => priceCounter += item.totalPrice);
    return priceCounter;
  }

  get totalCount() {
    let itemsCounter = 0;
    this.items.forEach(item => itemsCounter += item.quantity);
    return itemsCounter || 0;
  }

  getQuantity(product: AppProduct): number {
    if (!this.itemsMap) {return 0; }

    const item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }
}
