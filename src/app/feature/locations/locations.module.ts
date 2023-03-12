import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationListComponent} from './components/location-list/location-list.component';
import {LocationFormComponent} from './components/location-form/location-form.component';
import {AgmCoreModule} from '@agm/core';
import {LocationRoutingModule} from './locations-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { LocationInfoComponent } from './components/location-info/location-info.component';


@NgModule({
  declarations: [
    LocationListComponent,
    LocationFormComponent,
    LocationInfoComponent
  ],
    imports: [
        LocationRoutingModule,
        CommonModule,
        AgmCoreModule,
        ReactiveFormsModule
    ]
})
export class LocationsModule {
}
