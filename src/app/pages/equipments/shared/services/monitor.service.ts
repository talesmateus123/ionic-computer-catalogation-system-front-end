import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MonitorDTO, MonitorNewDTO } from '../models/equipments';
import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.monitors}`;

  constructor(public http: HttpClient) {
  }

  findAll(): Observable<MonitorDTO[]> {
      return this.http.get<MonitorDTO[]>(`${this.url}`);
  }

  findById(id: string): Observable<MonitorNewDTO> {
      return this.http.get<MonitorNewDTO>(`${this.url}/${id}`);
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
