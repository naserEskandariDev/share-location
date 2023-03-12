import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {AgmMap} from '@agm/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationService} from '../../services/location.service';
import {ActivatedRoute, Router} from '@angular/router';

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
      logo: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const locationId = this.activatedRoute.snapshot.params['id'];
    if (locationId) {
      this.locationService.read(+locationId).subscribe( (res) => {
        console.log(res);
        this.imgBlob = res.imgBlob;
        this.locationForm.get('name')?.setValue(res.name);
        this.locationForm.get('type')?.setValue(res.type);
        this.locationForm.patchValue({
          avatar: res.imgBlob
        });
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
        console.log(this.agmMap);
      }, 100);
    } else {
      console.log('map was not rendered');
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
    if (this.locationForm.valid) {
      this.locationService.create({...this.locationForm.value, imgBlob: this.imgBlob}).subscribe( (res) => {
        if (res?.id) {
          this.router.navigateByUrl('/location').then();
        }
      });
    }
  }

  removeLogo() {
    this.imageURL = '';
    this.locationForm.get('logo')?.setValue(null);
  }
}
