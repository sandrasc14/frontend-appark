import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import { User } from '../models/user';
import { ApiService } from './api.service';


@Injectable()

export class UserService {

  public url: String;
  public identity;
  public token: string;
  public usuario: User;

  constructor(private http: HttpClient, private apiService: ApiService) {
    this.url = GLOBAL.urlUser;
  }

  saveTotal(total: any): Observable<any> {
    return this.apiService.post(this.url + 'total', total)
      .map(res => res);
  }


  getUser(token: String, id: any): Observable<any> {
    return this.apiService.get(this.url + '/user/' + id).map(res => res);
  }

  updateUser(token, id: String, user: User): Observable<any> {
    return this.apiService.put(this.url + 'user/' + id, user)
      .map(res => res);
  }

  saveUser(token, user: User): Observable<any> {
    return this.apiService.post(this.url + 'saveUser', user)
      .map(res => res);
  }

  loginUser(user_to_login, gethash = null): Observable<any> {
    if (gethash != null) {
      user_to_login.gethash = gethash;
    }
    console.log(user_to_login);
    return this.apiService.post(this.url + 'loginUser', user_to_login)
      .map(res => res);

  }

  getIdentity(): Observable<any> {
    const identity = JSON.parse(localStorage.getItem('identity'));

    if (identity !== 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }


  getToken() {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;

  }

  guardarStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('identity', JSON.stringify(user));
    this.usuario = user;
    this.token = token;
  }

}
