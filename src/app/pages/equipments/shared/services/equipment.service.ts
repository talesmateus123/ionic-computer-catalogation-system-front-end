import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { API_CONFIG } from 'src/app/config';
import { EquipmentNewDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.equipments}`;

  constructor(public http: HttpClient) { }

  findById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
