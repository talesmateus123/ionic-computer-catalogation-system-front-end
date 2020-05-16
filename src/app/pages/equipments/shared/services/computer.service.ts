import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ComputerDTO, ComputerNewDTO } from '../models/equipments';
import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.computers}`;

  constructor(public http: HttpClient) {
  }

  findAll(): Observable<ComputerDTO[]> {
      return this.http.get<ComputerDTO[]>(`${this.url}`);
  }
  
  findAvailable(): Observable<ComputerDTO[]> {
    return this.http.get<ComputerDTO[]>(`${this.url}`);
  }

  findById(id: string): Observable<ComputerNewDTO> {
      return this.http.get<ComputerNewDTO>(`${this.url}/${id}`);
  }

  create(object: ComputerNewDTO): Observable<any> {
      return this.http.post<ComputerNewDTO>(`${this.url}`, object);
  }

  update(id: string, object: ComputerNewDTO): Observable<any> {
      return this.http.put<ComputerNewDTO>(`${this.url}/${id}`, object);
  }

  delete(id: string): Observable<any> {
      return this.http.delete<ComputerNewDTO>(`${this.url}/${id}`);
  }
}
