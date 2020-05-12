import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PrinterDTO, PrinterNewDTO } from '../models';
import { API_CONFIG } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  private url = `${API_CONFIG.baseUrl}${API_CONFIG.paths.printers}`;

  constructor(public http: HttpClient) {
  }

  findAll(): Observable<PrinterDTO[]> {
      return this.http.get<PrinterDTO[]>(`${this.url}`);
  }

  findById(id: string): Observable<PrinterNewDTO> {
      return this.http.get<PrinterNewDTO>(`${this.url}/${id}`);
  }

  create(object: PrinterNewDTO): Observable<any> {
      return this.http.post<PrinterNewDTO>(`${this.url}`, object);
  }

  update(id: string, object: PrinterNewDTO): Observable<any> {
      return this.http.put<PrinterNewDTO>(`${this.url}/${id}`, object);
  }

  delete(id: string): Observable<any> {
      return this.http.delete<PrinterNewDTO>(`${this.url}/${id}`);
  }
}
