import { ParkingService } from './../../../services/parking.service';
import { Parking } from './../../../models/parking.model';
import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Router } from '@angular/router';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-edit-parking',
  templateUrl: './edit-parking.component.html',
  styleUrls: ['./edit-parking.component.css'],
  providers: [ParkingService]

})
export class EditParkingComponent implements OnInit {
  availableList = [
    { text: 'Si', value: true },
    { name: 'No', value: false }
  ];
  public identity;
  public title: String = 'Registro de nuevo parking';
  public token;
  public url;
  public parking: Parking;
  public formParking: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private parkingService: ParkingService,
    private userService: UserService) {
    this.url = GLOBAL.url;
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.newForm();
  }

  ngOnInit() {
  }

  newForm() {
    this.formParking = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      accesibility: [true, Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      places: [0, Validators.required],
      score: [0]
    });
  }

  newParking() {
    this.parkingService.saveParking(this.token, this.formParking.value).subscribe(
      response => {
        if (!response) {
          swal('Error', 'el parking no se guardo correctamente', 'warning');
        } else {
          swal('Parking registrado', 'Datos guardados correctamente', 'success').then(reponse => {
            this.router.navigate(['/administration/mant-parking']);
          });
        }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
        }
      }
    );
  }
}
