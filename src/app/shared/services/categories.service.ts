import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriesService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<any[]> {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
        .snapshotChanges().map(actions => {
          return actions.map(action => ({key: action.key, ...action.payload.val()}));
        } );
  }
}
