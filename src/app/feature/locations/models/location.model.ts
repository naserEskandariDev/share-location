import {ILocation} from './location.interface';
import {ID} from '../../../core/models/base-model';
import {IGeoLocation} from './geo-location.interface';
import {GeoLocation} from './geo-location.model';

export class Location implements ILocation {
  constructor(
    public id?: ID,
    public location: IGeoLocation = new GeoLocation(),
    public name: string = 'Location name',
    public type: string = 'Location type',
    public logo: string = '',
    public imgBlob: Blob = new Blob()
  ) {
  }

  toString(): string {
    return this.name ?? '';
  }
}
