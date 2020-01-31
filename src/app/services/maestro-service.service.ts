import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaestroService {
  public busy: Subscription;
  constructor() { }

}
