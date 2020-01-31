import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { MatTable } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-map-parking',
  templateUrl: './dialog-map-parking.component.html',
  styleUrls: ['./dialog-map-parking.component.scss']
})
export class DialogMapParkingComponent implements OnInit, OnDestroy {
  position;
  address = '';
  location = {};
  private onDestroy$: Subject<void> = new Subject<void>();
  @ViewChild('table') table: MatTable<any>;
  notRepit = [];
  listLocations = [];
  notRepeatedLocations = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogMapParkingComponent>, private dialog: MatDialog) { }

  ngOnInit() {
    if (this.data.pointGeolocation) {
      this.location = {
        lat: this.data.pointGeolocation.latitude,
        lng: this.data.pointGeolocation.longitude,
        address: this.data.pointGeolocation.address
      };
      this.asignLocation(this.location);
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  asignLocation(location) {
    if (location.address) {
      this.address = location.address;
    } else {
      this.address = '';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  locationMarker(event){
    // console.log(event);
  }

}
