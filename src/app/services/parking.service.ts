import { Parking } from './../models/parking.model';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable(
  { providedIn: 'root' }
)

export class ParkingService {

  private url: string;
  private urlPulicParking: string;

  constructor(private apiService: ApiService) {
    this.url = GLOBAL.url;
    this.urlPulicParking = GLOBAL.urlPulicParking;
  }

  getPublicParkings(): Observable<any> {
    return this.apiService.get(this.urlPulicParking)
      .map(res => res);
  }

  saveParking(token, parking: Parking): Observable<any> {
    return this.apiService.post(this.url + 'parkings', parking)
      .map(res => res);
  }

  getParkingById(parkingId): Observable<any> {
    return this.apiService.get(this.url + 'parkings/' + parkingId)
      .map(res => res);
  }

  getParkings(): Observable<any> {
    return this.apiService.get(this.url + 'parkings')
      .map(res => res);
  }

  updateParking(id: String, parking: any): Observable<any> {
    return this.apiService.put(this.url + 'parkings/' + id, parking)
      .map(res => res);
  }

  deleteParking(token, id: String): Observable<any> {
    return this.apiService.delete(this.url + 'parkings/' + id).map(res => res);
  }

}
