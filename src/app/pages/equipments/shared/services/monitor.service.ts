import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MonitorDTO, MonitorNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';
import { SessionManagerService } from 'src/app/pages/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.monitors}`;

  constructor(
    public http: HttpClient,
    private sessionManagerService: SessionManagerService
    ) {
  }

  findAll(): Observable<MonitorDTO[]> {
      return this.http.get<MonitorDTO[]>(`${this.url}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  findAvailable(): Observable<MonitorDTO[]> {
    return this.http.get<MonitorDTO[]>(`${this.url}/available`, { 
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
  });
  }

  findById(id: string): Observable<MonitorNewDTO> {
      return this.http.get<MonitorNewDTO>(`${this.url}/${id}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  search(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/search`, {
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()),
      params: {
          searchTerm: searchTerm,
          direction: direction,
          orderBy: orderBy
      },
      observe: 'response'
    })
  }

  create(object: MonitorNewDTO): Observable<any> {
      return this.http.post<MonitorNewDTO>(`${this.url}`, object);
  }

  update(id: string, object: MonitorNewDTO): Observable<any> {
      return this.http.put<MonitorNewDTO>(`${this.url}/${id}`, object);
  }

  delete(id: string): Observable<any> {
      return this.http.delete<MonitorNewDTO>(`${this.url}/${id}`);
  }
}
