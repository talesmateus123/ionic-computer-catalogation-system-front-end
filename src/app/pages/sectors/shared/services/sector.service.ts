import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { API_CONFIG } from 'src/app/config';
import { SessionManagerService } from 'src/app/pages/shared-resources';
import { SectorDTO, SectorNewDTO } from '../models';

@Injectable()
export class SectorService {
    private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.sectors}`;

    constructor(
        public http: HttpClient,
        private sessionManagerService: SessionManagerService
    ) {}

    findAll(): Observable<SectorDTO[]> {
        return this.http.get<SectorDTO[]>(`${this.url}`, { 
            headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
        });
    }

    findById(id: string): Observable<SectorDTO> {
        return this.http.get<SectorDTO>(`${this.url}/${id}`, { 
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

    create(object: SectorNewDTO): Observable<any> {
        return this.http.post<SectorNewDTO>(`${this.url}`, object, { 
            headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
        });
    }

    update(id: string, object: SectorNewDTO): Observable<any> {
        return this.http.put<SectorNewDTO>(`${this.url}/${id}`, object, { 
            headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
    });
    }

    delete(id: string): Observable<any> {
        return this.http.delete<SectorNewDTO>(`${this.url}/${id}`, { 
            headers: new HttpHeaders().set('Authorization', this.sessionManagerService.getSessionToken()) 
        });
    }
}