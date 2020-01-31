import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const session = JSON.parse(localStorage.getItem(environment.sessionAuth));
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    if (
      session &&
      session.user &&
      session.user.token_type &&
      session.user.access_token
    ) {
      headersConfig['Authorization'] =
        session.user.token_type + ' ' + session.user.access_token;
    }
    request = request.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
