import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { API_CONFIG } from 'src/app/config';
import { SupportInfo } from '../models/support-info';

@Injectable({
  providedIn: 'root'
})
export class SupportInfoService {
  private url = `${environment.baseApiUrl}${API_CONFIG.paths.suppport}`;

  constructor(
    public http: HttpClient) { }

  findAll(): Observable<SupportInfo[]> {
    return this.http.get<SupportInfo[]>(`${this.url}`);
  }

  findById(id: string): Observable<SupportInfo> {
    return this.http.get<SupportInfo>(`${this.url}/${id}`);
  }

  search(searchTerm: string, direction: string, orderBy: string): Observable<any> {
    return this.http.get(`${this.url}/search`, {
      params: {
          searchTerm,
          direction,
          orderBy
      },
      observe: 'response'
    });
  }

}
