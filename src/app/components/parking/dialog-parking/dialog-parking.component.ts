import { DialogMapParkingComponent } from './../dialog-map-parking/dialog-map-parking.component';
import { Parking } from './../../../models/parking.model';
import { Component, OnInit, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ParkingService } from 'src/app/services/parking.service';
import { MaestroService } from 'src/app/services/maestro-service.service';

@Component({
  selector: 'app-dialog-parking',
  templateUrl: './dialog-parking.component.html',
  styleUrls: ['./dialog-parking.component.css']
})
export class DialogParkingComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public detalle: any[] = [];
  public productos: any[] = [];
  parking: any = {};

  constructor(
    private parkingService: ParkingService,
    public dialogRef: MatDialogRef<DialogParkingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public maestroService: MaestroService
  ) {
  }

  ngOnInit() {
    if (this.data) {
      this.getParkingById(this.data.parking.id);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  getParkingById(idParking) {
    this.maestroService.busy = this.parkingService.getParkingById(idParking).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          if (response) {
            this.parking = response;
          }
        },
        error => {
        }
      );
  }

  openDialogMap() {
    this.dialog.open(DialogMapParkingComponent, {
      data: { pointGeolocation: this.parking}, width: '500px'
    });
  }
}



