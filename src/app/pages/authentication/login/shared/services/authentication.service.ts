import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '../../../../../../environments/environment';

import { API_CONFIG } from 'src/app/config';
import { User, Login } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //private url = `${env.baseUrl}${API_CONFIG.paths.login}`;
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.login}`;


  constructor(public http: HttpClient) {
  }

  login(object: Login): Observable<any> {
    return this.http.post<User>(`${this.url}`, object, { observe: "response" });
  }
  
}
