import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaestroService } from '../../services/maestro-service.service';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import swal from 'sweetalert';
import { SugerenciasService } from '../../services/sugerencias.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css'],
  providers: [SugerenciasService]
})
export class SugerenciasComponent implements OnInit, OnDestroy {

  public url;
  public suggestionForm: FormGroup;
  private ngUnsubscribe: Subject<boolean> = new Subject();

  constructor(private fb: FormBuilder, private sugerenciaService: SugerenciasService,
     public maestroService: MaestroService) {
    this.url = GLOBAL.url;
    this.newForm();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  newForm() {
    this.suggestionForm = this.fb.group({
      numberDocument: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      description: ['', Validators.required],
    });
  }

  saveSugerencia() {
    if (this.suggestionForm.valid === true) {
      this.maestroService.busy = this.sugerenciaService.saveSuggestion(this.suggestionForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          res => {
            if (res) {
              swal('Sugerencia registrada', 'La sugerencia fue registrada exitosamente', 'success')
                .then((sugerenciaSave) => {
                  if (sugerenciaSave) {
                    this.newForm();
                  }
                });
            }
          }
        );
    } else {
      swal('Atención', 'Todos los campos son obligatorios', 'info');
    }
  }
}
