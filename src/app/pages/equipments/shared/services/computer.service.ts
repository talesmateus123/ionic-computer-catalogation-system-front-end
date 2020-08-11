import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ComputerDTO, ComputerNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';
import { SessionManagerService } from 'src/app/pages/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.computers}`;

  constructor(
    public http: HttpClient,
    private sessionManagerService: SessionManagerService
   ) {
  }

  findAll(): Observable<ComputerDTO[]> {
      return this.http.get<ComputerDTO[]>(`${this.url}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }
  
  findAvailable(): Observable<ComputerDTO[]> {
    return this.http.get<ComputerDTO[]>(`${this.url}/available`, { 
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
  });
  }

  findById(id: string): Observable<ComputerDTO> {
      return this.http.get<ComputerDTO>(`${this.url}/${id}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  search(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.standardSearchMethod.search}`, {
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()),
      params: {
          searchTerm: searchTerm,
          direction: direction,
          orderBy: orderBy
      },
      observe: 'response'
    })
  }

  searchComputerProcessor(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerProcessor}`, {
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()),
      params: {
          searchTerm: searchTerm,
          direction: direction,
          orderBy: orderBy
      },
      observe: 'response'
    })
  }

  searchComputerComputerUser(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerComputerUser}`, {
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()),
      params: {
          searchTerm: searchTerm,
          direction: direction,
          orderBy: orderBy
      },
      observe: 'response'
    })
  }

  searchComputerOnline(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerOnline}`, {
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()),
      params: {
          searchTerm: searchTerm,
          direction: direction,
          orderBy: orderBy
      },
      observe: 'response'
    })
  }

  searchComputerOnTheDomain(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerOnTheDomain}`, {
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()),
      params: {
          searchTerm: searchTerm,
          direction: direction,
          orderBy: orderBy
      },
      observe: 'response'
    })
  }

  searchComputerPersonalComputer(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerPersonalComputer}`, {
      headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()),
      params: {
          searchTerm: searchTerm,
          direction: direction,
          orderBy: orderBy
      },
      observe: 'response'
    })
  }

  create(object: ComputerNewDTO): Observable<any> {
      return this.http.post<ComputerNewDTO>(`${this.url}`, object, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  update(id: string, object: ComputerNewDTO): Observable<any> {
      return this.http.put<ComputerNewDTO>(`${this.url}/${id}`, object, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  delete(id: string): Observable<any> {
      return this.http.delete<ComputerNewDTO>(`${this.url}/${id}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }
}
