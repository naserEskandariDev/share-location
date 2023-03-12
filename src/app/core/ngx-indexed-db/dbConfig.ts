import {DBConfig} from 'ngx-indexed-db';

export const dbConfig: DBConfig  = {
  name: 'shareLocation',
  version: 1,
  objectStoresMeta: [
    {
      store: 'location',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'geoLocation', keypath: 'geoLocation', options: { unique: false } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'imgBlob', keypath: 'imgBlob', options: { unique: false } },
        { name: 'logo', keypath: 'logo', options: { unique: false } }
      ]
    }
  ]
};
