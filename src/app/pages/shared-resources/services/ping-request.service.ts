import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class PingRequestService {
  private url = `${environment.baseUrl}${API_CONFIG.paths.ping_request}`;

  constructor(public http: HttpClient) { }

  ping(): Observable<any> {
    return this.http.get(this.url);
  }
  
}
