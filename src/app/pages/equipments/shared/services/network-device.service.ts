import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NetworkDeviceDTO, NetworkDeviceNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';
import { SessionManagerService } from 'src/app/pages/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class NetworkDeviceService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.network_devices}`;

  constructor(
    public http: HttpClient,
    private sessionManagerService: SessionManagerService
    ) {
  }

  findAll(): Observable<NetworkDeviceDTO[]> {
      return this.http.get<NetworkDeviceDTO[]>(`${this.url}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  findById(id: string): Observable<NetworkDeviceNewDTO> {
      return this.http.get<NetworkDeviceNewDTO>(`${this.url}/${id}`, { 
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

  create(object: NetworkDeviceNewDTO): Observable<any> {
      return this.http.post<NetworkDeviceNewDTO>(`${this.url}`, object, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  update(id: string, object: NetworkDeviceNewDTO): Observable<any> {
      return this.http.put<NetworkDeviceNewDTO>(`${this.url}/${id}`, object, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  delete(id: string): Observable<any> {
      return this.http.delete<NetworkDeviceNewDTO>(`${this.url}/${id}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }
}
