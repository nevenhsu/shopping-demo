import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppProduct } from '../models/app-product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(id: string, date: AppProduct) {
    if (date['id']) { date['id'] = null; }
    return this.db.object('/products/' + id).update(date);
  }

  delete(id: string) {
    return this.db.object('/products/' + id).remove();
  }

  getAll(): Observable<AppProduct[]> {
    return this.db.list<AppProduct>('/products').snapshotChanges().map(actions => actions.map(action => ({
      id: action.key, ...action.payload.val()
    })));
  }

  get(key: string): Observable<AppProduct> {
    return this.db.object('/products/' + key).valueChanges().map(value => ({
      id: key,
      title: value['title'],
      price: value['price'],
      imageUrl: value['imageUrl'],
      category: value['category']
    }));
  }

}
