import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private url = `${API_CONFIG.baseUrl}`;

  constructor(public http: HttpClient) { }

  getComputersReport(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    
    return this.http.get(
      `${this.url}${API_CONFIG.paths.computers}/pdfreport`, 
      { headers: headers, responseType: 'blob' }
    );
  }

  getPrintersReport(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    
    return this.http.get(
      `${this.url}${API_CONFIG.paths.printers}/pdfreport`, 
      { headers: headers, responseType: 'blob' }
    );
  }

  getMonitorsReport(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    
    return this.http.get(
      `${this.url}${API_CONFIG.paths.monitors}/pdfreport`, 
      { headers: headers, responseType: 'blob' }
    );
  }

  getComputerUsersReport(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    
    return this.http.get(
      `${this.url}${API_CONFIG.paths.computer_users}/pdfreport`, 
      { headers: headers, responseType: 'blob' }
    );
  }

  getSectorsReport(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    
    return this.http.get(
      `${this.url}${API_CONFIG.paths.sectors}/pdfreport`, 
      { headers: headers, responseType: 'blob' }
    );
  }
  
}
