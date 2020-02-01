import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  public formatErrors(error: HttpErrorResponse) {
    let messageError = error.error ? error.error : error;
    // this.snackbarService.show(messageError, 'error');
    swal('Error', messageError, 'error');
    return throwError(messageError);
  }

  get(path: string, params?: any): Observable<any> {
    return this.http.get(path, { params }).pipe(
      catchError(error => {
        return this.formatErrors(error);
      })
    );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(path, JSON.stringify(body)).pipe(
      catchError(error => {
        return this.formatErrors(error);
      })
    );
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(path, JSON.stringify(body)).pipe(
      catchError(error => {
        return this.formatErrors(error);
      })
    );
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(path, JSON.stringify(body)).pipe(
      catchError(error => {
        return this.formatErrors(error);
      })
    );
  }

  postHTML(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(path, JSON.stringify(body), {
        responseType: 'text'
      })
      .pipe(
        catchError(error => {
          return this.formatErrors(error);
        })
      );
  }
  getHTML(path: string): Observable<any> {
    return this.http
      .get(path, {
        responseType: 'text'
      })
      .pipe(
        catchError(error => {
          return this.formatErrors(error);
        })
      );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path).pipe(
      catchError(error => {
        return this.formatErrors(error);
      })
    );
  }
}
