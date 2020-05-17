import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from 'src/app/config';
import { RamMemoryDTO, RamMemoryNewDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RamMemoryService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.ram_memories}`;

  constructor(public http: HttpClient) {
  }

  findAll(): Observable<RamMemoryDTO[]> {
      return this.http.get<RamMemoryDTO[]>(`${this.url}`);
  }

  findById(id: string): Observable<RamMemoryDTO> {
      return this.http.get<RamMemoryDTO>(`${this.url}/${id}`);
  }

  create(object: RamMemoryNewDTO): Observable<any> {
      return this.http.post<RamMemoryNewDTO>(`${this.url}`, object);
  }

  update(id: string, object: RamMemoryNewDTO): Observable<any> {
      return this.http.put<RamMemoryNewDTO>(`${this.url}/${id}`, object);
  }

  delete(id: string): Observable<any> {
      return this.http.delete<RamMemoryNewDTO>(`${this.url}/${id}`);
  }
}
