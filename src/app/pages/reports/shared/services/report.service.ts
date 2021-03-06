import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private url = `${environment.baseApiUrl}`;

  constructor(
    public http: HttpClient) { }

  getComputersReport(): Observable<any> {
    return this.http.get(
      `${this.url}${API_CONFIG.paths.computers}/pdfreport`,
      { responseType: 'blob' }
    );
  }

  getPrintersReport(): Observable<any> {
    return this.http.get(
      `${this.url}${API_CONFIG.paths.printers}/pdfreport`,
      { responseType: 'blob' }
    );
  }

  getMonitorsReport(): Observable<any> {
    return this.http.get(
      `${this.url}${API_CONFIG.paths.monitors}/pdfreport`,
      { responseType: 'blob' }
    );
  }

  getComputerUsersReport(): Observable<any> {
    return this.http.get(
      `${this.url}${API_CONFIG.paths.computer_users}/pdfreport`,
      { responseType: 'blob' }
    );
  }

  getSectorsReport(): Observable<any> {
    return this.http.get(
      `${this.url}${API_CONFIG.paths.sectors}/pdfreport`,
      { responseType: 'blob' }
    );
  }

}
