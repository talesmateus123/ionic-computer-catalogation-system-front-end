import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { API_CONFIG } from 'src/app/config';
import { SectorDTO, SectorNewDTO } from '../models';

@Injectable()
export class SectorService {
    private url = `${environment.baseApiUrl}${API_CONFIG.paths.sectors}`;

    constructor(
        public http: HttpClient
    ) {}

    findAll(): Observable<SectorDTO[]> {
        return this.http.get<SectorDTO[]>(`${this.url}`);
    }

    findById(id: string): Observable<SectorDTO> {
        return this.http.get<SectorDTO>(`${this.url}/${id}`);
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

    create(object: SectorNewDTO): Observable<any> {
        return this.http.post<SectorNewDTO>(`${this.url}`, object);
    }

    update(id: string, object: SectorNewDTO): Observable<any> {
        return this.http.put<SectorNewDTO>(`${this.url}/${id}`, object);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<SectorNewDTO>(`${this.url}/${id}`);
    }
}