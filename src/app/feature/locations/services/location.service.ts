import {Injectable} from '@angular/core';
import {ILocation} from '../models/location.interface';
import {IndexedDbService} from '../../../core/services/indexed-db.service';
import {BaseService} from '../../../core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService<ILocation>{

  constructor(public locationIndexedDbService: IndexedDbService<ILocation>) {
    super('location', locationIndexedDbService);
  }

}
