import {IGeoLocation} from './geo-location.interface';

export class GeoLocation implements IGeoLocation {
  constructor(public lat: number = 51.516705368126554,
              public lng: number = -0.13284970668561824) {
  }
}
