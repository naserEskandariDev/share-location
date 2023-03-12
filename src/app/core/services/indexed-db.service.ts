import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService<T> {
  constructor(private dbService: NgxIndexedDBService) {
  }

  addItem(model: T, key: string): Observable<T> {
    return this.dbService.add(key, model);
  }

  getItems(key: string): Observable<T[]> {
    return this.dbService.getAll(key)
  }

}
