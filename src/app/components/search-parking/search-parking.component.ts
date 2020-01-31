import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingService } from 'src/app/services/parking.service';
import { MaestroService } from 'src/app/services/maestro-service.service';
import { Parking } from 'src/app/models/parking.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.component.html',
  styleUrls: ['./search-parking.component.css']
})
export class SearchParkingComponent implements OnInit, OnDestroy {
  form: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'address', 'places'];
  vehicleList = [];
  private ngUnsubscribe: Subject<boolean> = new Subject();
  dataSource: Parking[] = [];
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
    this.listparkings();
    this.getListVehicles();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  listparkings() {
    this.dataSource = [];
    this.maestroService.busy = this.parkingService.getParkings().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response: Parking[]) => {
          if (response) {
            this.dataSource = response;
          }
        },
        error => {
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
