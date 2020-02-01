// <reference types='@types/googlemaps' />
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  NgZone,
  Output,
  EventEmitter,
} from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
// import { GoogleMapsAPIWrapper } from '@agm/core/services';
declare const google: any;

interface Location {
  lat: number;
  lng: number;
  zoom: number;
}
interface Point {
  lat: number;
  lng: number;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.sass']
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() address: String;
  @Input() addressList: any[];
  @Input() locations: any[];
  @Input() multiple = false;
  @Input() point: Point;
  @Output() locationMarker = new EventEmitter<object>();
  @ViewChild(AgmMap) map: AgmMap;
  @ViewChild('street-view') streetView;
  public geocoder: any;
  location: Location = {
    lat: 36.7201614,
    lng: -4.4203401,
    zoom: 16
  };
  geoAddress: string;

  constructor(
    public mapsApiLoader: MapsAPILoader,
    public zone: NgZone,
    // public wrapper: GoogleMapsAPIWrapper
  ) {
    this.zone = zone;
    // this.wrapper = wrapper;
  }
  ngOnInit() {
    this.multipleMaps();
  }

  ngOnChanges() {
    if (this.point !== undefined) {
      this.location = {
        lat: this.point.lat,
        lng: this.point.lng,
        zoom: 16
      };
    }
  }

  multipleMaps() {
    if (this.multiple) {
      for (const location of this.locations) {
        if (location.lat && location.lng) {
          this.location.lat = location.lat;
          this.location.lng = location.lng;
          break;
        }
      }
    }
  }

  markerDragEnd(data) {
    this.locationMarker.emit(data.coords);
  }
}
