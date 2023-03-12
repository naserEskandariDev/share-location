import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlobToBase64Service {

  // convertBlobToBase64(blob: Blob): Observable<any> { // blob data
  //   return this.blobToBase64(blob);
  // }

  // blobToBase64(blob: any): Observable<any> {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob);
  //     reader.onload = () => reader.result;
  //     reader.onerror = error => error;
  // }
}
