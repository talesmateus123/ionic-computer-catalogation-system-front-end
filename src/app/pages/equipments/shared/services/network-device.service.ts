import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { NetworkDeviceDTO, NetworkDeviceNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class NetworkDeviceService {
  private url = `${environment.baseApiUrl}${API_CONFIG.paths.network_devices}`;

  constructor(
    public http: HttpClient
    ) {
  }

  findAll(): Observable<NetworkDeviceDTO[]> {
      return this.http.get<NetworkDeviceDTO[]>(`${this.url}`);
  }

  findById(id: string): Observable<NetworkDeviceNewDTO> {
      return this.http.get<NetworkDeviceNewDTO>(`${this.url}/${id}`);
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

  create(object: NetworkDeviceNewDTO): Observable<any> {
      return this.http.post<NetworkDeviceNewDTO>(`${this.url}`, object);
  }

  update(id: string, object: NetworkDeviceNewDTO): Observable<any> {
      return this.http.put<NetworkDeviceNewDTO>(`${this.url}/${id}`, object);
  }

  delete(id: string): Observable<any> {
      return this.http.delete<NetworkDeviceNewDTO>(`${this.url}/${id}`);
  }
}
