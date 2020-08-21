import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ComputerUserDTO, ComputerUserNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ComputerUserService {
  private url = `${environment.baseApiUrl}${API_CONFIG.paths.computer_users}`;

  constructor(
    public http: HttpClient
    ) {
  }

  findAll(): Observable<ComputerUserDTO[]> {
      return this.http.get<ComputerUserDTO[]>(`${this.url}`);
  }
  
  findAvailable(): Observable<ComputerUserDTO[]> {
    return this.http.get<ComputerUserDTO[]>(`${this.url}/available`);
  }

  findById(id: string): Observable<ComputerUserDTO> {
      return this.http.get<ComputerUserDTO>(`${this.url}/${id}`);
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

  create(object: ComputerUserNewDTO): Observable<any> {
      return this.http.post<ComputerUserNewDTO>(`${this.url}`, object);
  }

  update(id: string, object: ComputerUserNewDTO): Observable<any> {
      return this.http.put<ComputerUserNewDTO>(`${this.url}/${id}`, object);
  }

  delete(id: string): Observable<any> {
      return this.http.delete<ComputerUserNewDTO>(`${this.url}/${id}`);
  }
}
