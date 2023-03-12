import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {AgmMap} from '@agm/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationService} from '../../services/location.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ILocation} from '../../models/location.interface';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit, AfterViewInit {

  @ViewChild('uploader', {static: false}) uploader!: ElementRef;
  @ViewChild('map') public agmMap!: AgmMap;
  longitude: number = -0.13284970668561824;
  latitude: number = 51.516705368126554;
  firstSubmitPush = false;
  imageURL?: string;
  editMode = false;
  zoom: number = 10;

  locationForm!: FormGroup;
  imgBlob!: Blob;

  constructor(private locationService: LocationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.locationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      location: new FormGroup({
        lat: new FormControl('', [Validators.required]),
        lng: new FormControl('', [Validators.required]),
      }),
      type: new FormControl('', [Validators.required]),
      logo: new FormControl('')
    });
  }

  ngOnInit(): void {
    const locationId = this.activatedRoute.snapshot.params['id'];
    if (locationId) {
      this.editMode = true;
      this.locationService.read(+locationId).subscribe( (res) => {
        this.imgBlob = res.imgBlob;
        this.locationForm.get('name')?.setValue(res.name);
        this.locationForm.get('type')?.setValue(res.type);
        this.locationForm.patchValue({
          avatar: res.imgBlob
        });
        this.locationForm.get('logo')?.setValue('');
        this.locationForm.get('logo')?.updateValueAndValidity()
        this.locationForm.get('location')?.patchValue(res.location);
        this.latitude = res.location.lat;
        this.longitude = res.location.lng;
        const reader = new FileReader();
        reader.onload = () => {
          this.imageURL = reader.result as string;
        }
        reader.readAsDataURL(res.imgBlob);
      })
    } else {
      this.setCurrentLocation();
    }
  }

  ngAfterViewInit(): void {
    if (this.agmMap) {
      setTimeout(() => {
        this.agmMap.triggerResize();
      }, 100);
    } else {
      console.warn('map was not rendered');
    }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  public attachFile(): void {
    this.uploader.nativeElement.click();
  }

  uploaderChanged(event: any): void {
    if (event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
      alert('Logo format is not correct');
    } else {
      const file = event.target.files[0];
      this.imgBlob = file;
      this.locationForm.patchValue({
        avatar: file
      });
      this.locationForm.get('logo')?.updateValueAndValidity()
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }

  centerChanged($event: google.maps.LatLngLiteral): void {
    if ($event.lat && $event.lng) {
      this.locationForm.get('location')?.get('lat')?.setValue($event.lat);
      this.locationForm.get('location')?.get('lng')?.setValue($event.lng);
    }
  }

  onSubmit(): void {
    this.firstSubmitPush = true;
    if (this.locationForm.valid && this.imageURL) {
      const model = {...this.locationForm.value, imgBlob: this.imgBlob}
      let service: any;
      if (this.editMode) {
        model.id = this.activatedRoute.snapshot.params['id'];
        service = this.locationService.update(model);
      } else {
        service = this.locationService.create(model)
      }
      service.subscribe( (res: ILocation) => {
        if (res?.id) {
          this.router.navigateByUrl('/location').then();
        }
      });
    }
  }

  removeLogo() {
    this.imageURL = undefined;
    this.locationForm.get('logo')?.setValue(null);
  }
}
