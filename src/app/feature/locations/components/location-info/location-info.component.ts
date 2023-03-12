import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILocation} from '../../models/location.interface';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss']
})
export class LocationInfoComponent implements OnInit {
  @Input() location!: ILocation;
  @Output() closeInfo: EventEmitter<boolean> = new EventEmitter<boolean>();
  imageURL?: string;

  ngOnInit(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.location.imgBlob);
  }

  onClose(): void {
    this.closeInfo.emit(true);
  }

}
