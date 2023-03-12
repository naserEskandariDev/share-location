import {IBaseModel, ID} from '../models/base-model';
import {Observable, of, switchMap} from 'rxjs';
import {IndexedDbService} from './indexed-db.service';

export class BaseService<T extends IBaseModel> {
  protected constructor(
      public key: string,
      public indexedDBService: IndexedDbService<T>,
  ) {
  }

  create(model: T): Observable<T> {
    return this.indexedDBService.createItem(model, this.key);
  }

  update(model: T): Observable<T> {
    return this.indexedDBService.updateItem(model, this.key);
  }

  readAll(): Observable<T[]> {
    return this.indexedDBService.getItems(this.key);
  }

  read(id: ID): Observable<T> {
    return this.indexedDBService.getItems(this.key).pipe(
        switchMap((list) =>  of(list.find((item: T) =>  item.id === id) as T)));
  }

}
