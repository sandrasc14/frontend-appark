import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from 'src/app/services/parking.service';
import { MaestroService } from 'src/app/services/maestro-service.service';
import { Parking } from 'src/app/models/parking.model';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.component.html',
  styleUrls: ['./search-parking.component.css']
})
export class SearchParkingComponent implements OnInit, OnDestroy {
  form: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'address', 'places', 'available'];
  vehicleList = [];
  private ngUnsubscribe: Subject<boolean> = new Subject();
  dataSource: Parking[] = [];
  locations: any[] = [];
  ratingList = [
    { viewValue: 'Muy bueno' },
    { viewValue: 'Bueno' },
    { viewValue: 'Regular' },
    { viewValue: 'Malo' },
    { viewValue: 'Muy malo' }
  ];
  constructor(
    private fb: FormBuilder,
    private parkingService: ParkingService,
    public maestroService: MaestroService,
    private vehicleService: VehicleService
  ) {
    this.form = this.fb.group({
      name: [],
      price: [],
      vehicle: [],
      places: [],
      address: []
    });
  }

  ngOnInit() {
    /*     this.listparkings(); */
    this.getListVehicles();
    this.listPublicParkings();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  listPublicParkings() {
    this.locations = [];
    this.maestroService.busy = this.parkingService.getPublicParkings().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          this.locations = response.result.records.map(item => {
            item.lat = item.latitude;
            item.lng = item.longitude;
            return item;
          });
          this.dataSource = this.locations;
          this.locations = JSON.parse(JSON.stringify(this.locations));
        }
      );
  }

  filterParking() {
    if (!this.form.controls['name'].value
      && !this.form.controls['price'].value
      && !this.form.controls['vehicle'].value
      && !this.form.controls['places'].value
      && !this.form.controls['address'].value
    ) {
      this.locations = this.dataSource;
    } else {
      if (this.form.controls['name'].value
        && !this.form.controls['price'].value
        && !this.form.controls['vehicle'].value
        && !this.form.controls['places'].value
        && !this.form.controls['address'].value) {
        this.locations = this.locations.filter(value => value.nombre === this.form.controls['name'].value.trim());
      } else {
        if (
          !this.form.controls['name'].value
          && !this.form.controls['price'].value
          && !this.form.controls['vehicle'].value
          && this.form.controls['address'].value
          && !this.form.controls['places'].value) {
          this.locations = this.locations.filter(value => value.direccion === this.form.controls['address'].value.trim());
        } else {
          if (
            !this.form.controls['name'].value
            && !this.form.controls['price'].value
            && !this.form.controls['vehicle'].value
            && this.form.controls['places'].value
            && !this.form.controls['address'].value) {
            this.locations = this.locations.filter(value => value.libres === this.form.controls['places'].value.trim());
          } else {
            if (
              this.form.controls['name'].value
              && !this.form.controls['price'].value
              && !this.form.controls['vehicle'].value
              && !this.form.controls['places'].value
              && this.form.controls['address'].value) {
              this.locations = this.locations.filter(value =>
                value.nombre === this.form.controls['name'].value.trim() &&
                value.direccion === this.form.controls['address'].value.trim()
              );
            } else {
              if (
                this.form.controls['name'].value
                && !this.form.controls['price'].value
                && !this.form.controls['vehicle'].value
                && this.form.controls['places'].value
                && !this.form.controls['address'].value) {
                this.locations = this.locations.filter(value =>
                  value.nombre === this.form.controls['name'].value.trim() &&
                  value.libres === this.form.controls['places'].value.trim()
                );
              } else {
                if (
                  !this.form.controls['name'].value
                  && !this.form.controls['price'].value
                  && !this.form.controls['vehicle'].value
                  && this.form.controls['places'].value
                  && this.form.controls['address'].value) {
                  this.locations = this.locations.filter(value =>
                    value.direccion === this.form.controls['address'].value.trim() &&
                    value.libres === this.form.controls['places'].value.trim()
                  );
                } else {
                  if (
                    this.form.controls['name'].value
                    && !this.form.controls['price'].value
                    && !this.form.controls['vehicle'].value
                    && this.form.controls['places'].value
                    && this.form.controls['address'].value) {
                    this.locations = this.locations.filter(value =>
                      value.direccion === this.form.controls['address'].value.trim() &&
                      value.libres === this.form.controls['places'].value.trim() &&
                      value.nombre === this.form.controls['name'].value.trim()
                    );
                  } else {
                    this.locations = this.dataSource;
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.locations.length === 0) {
      this.locations = this.dataSource;
    }
  }

  listparkings() {
    this.dataSource = [];
    this.maestroService.busy = this.parkingService.getParkings().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response: Parking[]) => {
          if (response) {
            this.dataSource = response;
          }
        }
      );
  }

  getListVehicles() {
    this.maestroService.busy = this.vehicleService.getVehicles().subscribe(
      response => {
        if (response) {
          this.vehicleList = response;
        }
      }
    );
  }

}
