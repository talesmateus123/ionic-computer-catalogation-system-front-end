import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class AuthUtilService {
  private url = `${environment.baseUrl}`;

  constructor(
      public http: HttpClient
  ) {}

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.url}${API_CONFIG.paths.auth_refresh_token}`, null);
  }

  forgotPassword(object: any): Observable<any> {
    return this.http.post<any>(`${this.url}${API_CONFIG.paths.auth_forgot_password}`, object);
  }
}
