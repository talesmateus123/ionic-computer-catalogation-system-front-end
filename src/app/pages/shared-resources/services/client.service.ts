import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ClientDTO, ClientNewDTO } from '../../authentication';

import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = `${environment.baseApiUrl}${API_CONFIG.paths.clients}`;

  constructor(
    public http: HttpClient
    ) {
  }

  findAll(): Observable<ClientDTO[]> {
      return this.http.get<ClientDTO[]>(`${this.url}`);
  }

  findById(id: string): Observable<any> {
      return this.http.get<any>(`${this.url}/${id}`);
  }

  create(object: ClientNewDTO): Observable<any> {
      return this.http.post<ClientNewDTO>(`${this.url}`, object);
  }

  update(id: string, object: ClientNewDTO): Observable<any> {
      return this.http.put<ClientNewDTO>(`${this.url}/${id}`, object);
  }

  delete(id: string): Observable<any> {
      return this.http.delete<ClientNewDTO>(`${this.url}/${id}`);
  }
}
