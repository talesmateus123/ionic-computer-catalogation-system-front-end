import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from 'src/app/config';
import { ProcessorDTO, ProcessorNewDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProcessorService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.processors}`;

  constructor(public http: HttpClient) {
  }

  findAll(): Observable<ProcessorDTO[]> {
      return this.http.get<ProcessorDTO[]>(`${this.url}`);
  }

  findById(id: string): Observable<ProcessorDTO> {
      return this.http.get<ProcessorDTO>(`${this.url}/${id}`);
  }

  create(object: ProcessorNewDTO): Observable<any> {
      return this.http.post<ProcessorNewDTO>(`${this.url}`, object);
  }

  update(id: string, object: ProcessorNewDTO): Observable<any> {
      return this.http.put<ProcessorNewDTO>(`${this.url}/${id}`, object);
  }

  delete(id: string): Observable<any> {
      return this.http.delete<ProcessorNewDTO>(`${this.url}/${id}`);
  }
}
