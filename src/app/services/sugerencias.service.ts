import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { GLOBAL } from './global';
import { ApiService } from './api.service';


@Injectable()

export class SugerenciasService {

  public url: String;

  constructor(private apiService: ApiService) {
    this.url = GLOBAL.url;
  }

  saveSuggestion(sugerencia: any): Observable<any> {
    return this.apiService.post(this.url + 'suggestions', sugerencia)
      .map(res => res);
  }

  getSuggestionById(suggestionId = null): Observable<any> {
    return this.apiService.get(this.url + 'suggestions/' + suggestionId)
      .map(res => res);
  }


  getSuggestions(): Observable<any> {
    return this.apiService.get(this.url + 'suggestions')
      .map(res => res);
  }

}
