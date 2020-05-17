import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_CONFIG } from 'src/app/config';
import { StorageDeviceDTO, StorageDeviceNewDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StorageDeviceService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.storage_devices}`;

  constructor(public http: HttpClient) {
  }

  findAll(): Observable<StorageDeviceDTO[]> {
      return this.http.get<StorageDeviceDTO[]>(`${this.url}`);
  }

  findById(id: string): Observable<StorageDeviceDTO> {
      return this.http.get<StorageDeviceDTO>(`${this.url}/${id}`);
  }

  create(object: StorageDeviceNewDTO): Observable<any> {
      return this.http.post<StorageDeviceNewDTO>(`${this.url}`, object);
  }

  update(id: string, object: StorageDeviceNewDTO): Observable<any> {
      return this.http.put<StorageDeviceNewDTO>(`${this.url}/${id}`, object);
  }

  delete(id: string): Observable<any> {
      return this.http.delete<StorageDeviceNewDTO>(`${this.url}/${id}`);
  }
}
