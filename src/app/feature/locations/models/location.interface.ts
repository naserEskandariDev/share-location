import {IBaseModel} from '../../../core/models/base-model';
import {IGeoLocation} from './geo-location.interface';

export interface ILocation extends IBaseModel{
  location: IGeoLocation;
  name: string;
  type: string;
  logo: string;
  imgBlob: Blob;
}
