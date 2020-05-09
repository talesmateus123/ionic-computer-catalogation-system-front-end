import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config';
import { SectorDTO } from 'src/app/models/sector.dto';

@Injectable()
export class SectorService {
    private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.sectors}`;

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<SectorDTO[]> {
        return this.http.get<SectorDTO[]>(`${this.url}`);
    }

    findById(id: string): Observable<SectorDTO> {
        return this.http.get<SectorDTO>(`${this.url}/${id}`);
    }

    create(object: SectorDTO): Observable<SectorDTO> {
        return this.http.post<SectorDTO>(`${this.url}`, object);
    }

    update(id: string, object: SectorDTO): Observable<SectorDTO> {
        return this.http.put<SectorDTO>(`${this.url}/${id}`, object);
    }

    delete(id: string): Observable<SectorDTO> {
        return this.http.delete<SectorDTO>(`${this.url}/${id}`);
    }
}