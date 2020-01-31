import { MatDialog } from '@angular/material';
import { Parking } from './../../../models/parking.model';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaestroService } from '../../../services/maestro-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ParkingService } from 'src/app/services/parking.service';
import { DialogParkingComponent } from '../dialog-parking/dialog-parking.component';
declare const swal: any;

@Component({
  selector: 'app-adm-parking',
  templateUrl: './adm-parking.component.html',
  styleUrls: ['./adm-parking.component.css'],
  providers: [UserService]
})
export class AdmParkingComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject();
  cantidad: any = 0;
  identity;
  token;
  url;
  band_editar: boolean;
  parkings: Parking[] = [];
  selectedParking;

  constructor(
    private parkingService: ParkingService, public maestroService: MaestroService,
    private _router: Router,
    private dialog: MatDialog,
    private _userService: UserService) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.listparkings();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  listparkings() {
    this.maestroService.busy = this.parkingService.getParkings().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          if (response) {
            this.parkings = response;
          }
        },
        error => {
        }
      );
  }

  onRowSelect(event) {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogParkingComponent, {
      width: '600px',
      data: { parking: this.selectedParking }
    });

    dialogRef.afterClosed().subscribe(result => {
      /*  console.log(result);
       if (result !== undefined) {
       } else {
         this.getComprobantes();
       } */
    });
  }

  editParking(idParking: String) {
    this._router.navigate(['/edit-parking/' + idParking]);
  }


  deleteParking(idParking: any) {
    swal({
      title: 'Eliminar parking', text: '¿Usted esta seguro de eliminar el parking?', icon: 'info',
      buttons: ['Cancelar', 'Confirmar']
    })
      .then((deleteProd) => {
        if (deleteProd) {
          this.maestroService.busy = this.parkingService.deleteParking(this.token, idParking).pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
              response => {
                swal('Parking eliminado', 'El parking se elimino correctamente', 'success')
                  .then((confirm) => {
                    if (confirm) {
                      this.listparkings();
                    }
                  });
              },
              error => {
              }
            );
        }
      });
  }
}
