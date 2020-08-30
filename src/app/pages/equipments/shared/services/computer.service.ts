import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ComputerDTO, ComputerNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  private url = `${environment.baseApiUrl}${API_CONFIG.paths.computers}`;

  constructor(
    public http: HttpClient
   ) {
  }

  findAll(): Observable<ComputerDTO[]> {
      return this.http.get<ComputerDTO[]>(`${this.url}`);
  }

  findAvailable(): Observable<ComputerDTO[]> {
    return this.http.get<ComputerDTO[]>(`${this.url}/available`);
  }

  findById(id: string): Observable<ComputerDTO> {
      return this.http.get<ComputerDTO>(`${this.url}/${id}`);
  }

  search(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.standardSearchMethod.search}`, {
      params: {
          searchTerm,
          direction,
          orderBy
      },
      observe: 'response'
    });
  }

  searchComputerProcessor(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerProcessor}`, {
      params: {
          searchTerm,
          direction,
          orderBy
      },
      observe: 'response'
    });
  }

  searchComputerComputerUser(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerComputerUser}`, {
      params: {
          searchTerm,
          direction,
          orderBy
      },
      observe: 'response'
    });
  }

  searchComputerOnline(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerOnline}`, {
      params: {
          searchTerm,
          direction,
          orderBy
      },
      observe: 'response'
    });
  }

  searchComputerOnTheDomain(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerOnTheDomain}`, {
      params: {
          searchTerm,
          direction,
          orderBy
      },
      observe: 'response'
    });
  }

  searchComputerPersonalComputer(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/${API_CONFIG.computerSearchMethods.searchComputerPersonalComputer}`, {
      params: {
          searchTerm,
          direction,
          orderBy
      },
      observe: 'response'
    });
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
