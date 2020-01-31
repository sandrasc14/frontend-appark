import { SugerenciasService } from './../../../services/sugerencias.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ParkingService } from 'src/app/services/parking.service';
import { MaestroService } from 'src/app/services/maestro-service.service';

@Component({
  selector: 'app-dialog-sugerencias',
  templateUrl: './dialog-sugerencias.component.html',
  styleUrls: ['./dialog-sugerencias.component.css'],
  providers: [SugerenciasService]
})
export class DialogSugerenciasComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<boolean> = new Subject();
  suggestion: any = {};
  constructor(
    private suggestionService: SugerenciasService,
    public dialogRef: MatDialogRef<DialogSugerenciasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public maestroService: MaestroService
  ) {
  }

  ngOnInit() {
    if (this.data) {
      this.getSuggestionsById(this.data.suggestion.id);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  getSuggestionsById(idSuggestion) {
    this.maestroService.busy = this.suggestionService.getSuggestionById(idSuggestion).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        response => {
          if (response) {
            this.suggestion = response;
          }
        },
        error => {
        }
      );
  }
}



