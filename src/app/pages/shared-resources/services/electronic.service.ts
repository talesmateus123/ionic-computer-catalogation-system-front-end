import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_CONFIG } from 'src/app/config';
import { SessionManagerService } from './session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronicService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.electronics}`;

  constructor(
    public http: HttpClient,
    private sessionManagerService: SessionManagerService
    ) { }

  findById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, { 
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
  });
  }
}
