import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ElectronicService {
  private url = `${environment.baseApiUrl}${API_CONFIG.paths.electronics}`;

  constructor(
    public http: HttpClient
    ) { }

  findById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
