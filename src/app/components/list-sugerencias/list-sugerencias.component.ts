import { SugerenciasService } from './../../services/sugerencias.service';
import { MatDialog } from '@angular/material';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MaestroService } from '../../services/maestro-service.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { DialogSugerenciasComponent } from './dialog-sugerencias/dialog-sugerencias.component';

@Component({
  selector: 'app-list-sugerencias',
  templateUrl: './list-sugerencias.component.html',
  styleUrls: ['./list-sugerencias.component.css'],
  providers: [UserService, MaestroService, SugerenciasService]
})
export class ListSugerenciasComponent implements OnInit, OnDestroy {

  public identity;
  public selectedSugerencia;
  public token;
  public url;
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public sugerencias: any[] = [];
  constructor(
    private dialog: MatDialog,
    public maestroService: MaestroService,
    private sugerenciaService: SugerenciasService,
    private _userService: UserService) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getSugerencias();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  onRowSelect(event) {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogSugerenciasComponent, {
      width: '700px',
      data: { suggestion: this.selectedSugerencia }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getSugerencias() {
    this.maestroService.busy = this.sugerenciaService.getSuggestions().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          this.sugerencias = [];
          if (res) {
            this.sugerencias = res;
          }
        } 
      );
  }
}
