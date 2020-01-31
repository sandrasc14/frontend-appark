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
    lat: -12.0655094,
    lng: -77.041625,
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

  markerDragEnd(data) {
    this.locationMarker.emit(data.coords);
  }
}
