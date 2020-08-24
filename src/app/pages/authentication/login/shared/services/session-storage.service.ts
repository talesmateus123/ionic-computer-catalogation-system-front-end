import { Injectable } from '@angular/core';
import { ClientDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public getSessionUser(): ClientDTO {
    return JSON.parse(localStorage['user']);
  }

  public setSessionUser(user: any): void {
    if(user) {
      let clientDTO: ClientDTO = {
        id: user.id,
        email: user.email,
        name: user.name,
      }
      user.profiles.forEach(profile => {
        if (profile === "ADMIN") clientDTO.hasAdminProfile = true;
        else if (profile ==="CLIENT") clientDTO.hasClientProfile =true;
      });
      localStorage['user'] = JSON.stringify(clientDTO);
      return;
    }
    localStorage['user'] = JSON.stringify(null);
  }

  public getSessionSecurityKey(): string {
    return localStorage['security-key'] !== "null" ? localStorage['security-key'] : null;
  }

  public setSessionSecurityKey(token: string): void {
    localStorage['security-key'] = token;
  }
  
}
