import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ComputerUserDTO, ComputerUserNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';
import { SessionManagerService } from 'src/app/pages/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class ComputerUserService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.computer_users}`;

  constructor(
    public http: HttpClient,
    private sessionManagerService: SessionManagerService
    ) {
  }

  findAll(): Observable<ComputerUserDTO[]> {
      return this.http.get<ComputerUserDTO[]>(`${this.url}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }
  
  findAvailable(): Observable<ComputerUserDTO[]> {
    return this.http.get<ComputerUserDTO[]>(`${this.url}/available`, { 
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
  });
  }

  findById(id: string): Observable<ComputerUserDTO> {
      return this.http.get<ComputerUserDTO>(`${this.url}/${id}`, { 
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

  create(object: ComputerUserNewDTO): Observable<any> {
      return this.http.post<ComputerUserNewDTO>(`${this.url}`, object, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  update(id: string, object: ComputerUserNewDTO): Observable<any> {
      return this.http.put<ComputerUserNewDTO>(`${this.url}/${id}`, object, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  delete(id: string): Observable<any> {
      return this.http.delete<ComputerUserNewDTO>(`${this.url}/${id}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }
}
