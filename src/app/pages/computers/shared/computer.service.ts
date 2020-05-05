import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ComputerDTO } from 'src/app/models';
import { API_CONFIG } from 'src/app/config';

@Injectable()
export class ComputerService {

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<ComputerDTO[]> {
        return this.http.get<ComputerDTO[]>(`${API_CONFIG.baseUrl}${API_CONFIG.paths.computers}`);
    }
}