import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PrinterDTO, PrinterNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';
import { SessionManagerService } from 'src/app/pages/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.printers}`;

  constructor(
    public http: HttpClient,
    private sessionManagerService: SessionManagerService
    ) {
  }

  findAll(): Observable<PrinterDTO[]> {
      return this.http.get<PrinterDTO[]>(`${this.url}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  findById(id: string): Observable<PrinterNewDTO> {
      return this.http.get<PrinterNewDTO>(`${this.url}/${id}`, { 
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

  create(object: PrinterNewDTO): Observable<any> {
      return this.http.post<PrinterNewDTO>(`${this.url}`, object, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  update(id: string, object: PrinterNewDTO): Observable<any> {
      return this.http.put<PrinterNewDTO>(`${this.url}/${id}`, object, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }

  delete(id: string): Observable<any> {
      return this.http.delete<PrinterNewDTO>(`${this.url}/${id}`, { 
        headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
  }
}
