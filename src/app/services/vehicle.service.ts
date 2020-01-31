import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable(
    { providedIn: 'root' }
)

export class VehicleService {

    public url: String;

    constructor(private apiService: ApiService) {
        this.url = GLOBAL.url;
    }

    saveVehicle(token, vehicle: any): Observable<any> {
        return this.apiService.post(this.url + 'vehicles', vehicle)
            .map(res => res);
    }

    getVehicleById(id): Observable<any> {
        return this.apiService.get(this.url + 'vehicles/' + id)
            .map(res => res);
    }

    getVehicles(): Observable<any> {
        return this.apiService.get(this.url + 'vehicles')
            .map(res => res);
    }

    updateVehicle(id: String, vehicle: any): Observable<any> {
        return this.apiService.put(this.url + 'vehicles/' + id, vehicle)
            .map(res => res);
    }

    deleteVehicle(token, id: String): Observable<any> {
        return this.apiService.delete(this.url + 'vehicles/' + id).map(res => res);
    }

}
