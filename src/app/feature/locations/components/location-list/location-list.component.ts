import {Component, OnInit} from '@angular/core';
import {IGeoLocation} from '../../models/geo-location.interface';
import {environment} from '../../../../../environments/environment';
import {LocationService} from '../../services/location.service';
import {ILocation} from '../../models/location.interface';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  mapConfig = environment.mapDefaultConfig;
  locationList: ILocation[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.readAll().subscribe( (res) => {
      this.locationList = res;
    });
  }
}
