import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { API_CONFIG } from "../../../config";
import { ComputerDTO } from "../../../models";
import { Observable } from 'rxjs';

@Injectable()
export class ComputerService {

    constructor(public http: HttpClient) {
    }

    findAll(): Observable<ComputerDTO[]> {
        return this.http.get<ComputerDTO[]>(`${API_CONFIG.baseUrl}${API_CONFIG.paths.computers}`);
    }
}