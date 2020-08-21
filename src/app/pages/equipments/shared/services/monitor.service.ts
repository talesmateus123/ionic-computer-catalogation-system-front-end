import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { MonitorDTO, MonitorNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private url = `${environment.baseApiUrl}${API_CONFIG.paths.monitors}`;

  constructor(
    public http: HttpClient
    ) {
  }

  findAll(): Observable<MonitorDTO[]> {
      return this.http.get<MonitorDTO[]>(`${this.url}`);
  }

  findAvailable(): Observable<MonitorDTO[]> {
    return this.http.get<MonitorDTO[]>(`${this.url}/available`);
  }

  findById(id: string): Observable<MonitorNewDTO> {
      return this.http.get<MonitorNewDTO>(`${this.url}/${id}`);
  }

  search(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/search`, {
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
