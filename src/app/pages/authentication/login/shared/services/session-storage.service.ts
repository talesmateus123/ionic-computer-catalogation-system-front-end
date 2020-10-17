import { Injectable } from '@angular/core';
import { ClientDTO } from '../models';
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public getSessionUser(): ClientDTO {
    return localStorage.user ? JSON.parse(localStorage.user) : null;
  }

  public setSessionUser(user: any): void {
    if (user) {
      const clientDTO: ClientDTO = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      user.profiles.forEach(profile => {
        if (profile === 'ADMIN') { clientDTO.hasAdminProfile = true; }
        else if (profile === 'CLIENT') { clientDTO.hasClientProfile = true; }
      });
      localStorage.user = JSON.stringify(clientDTO);
      return;
    }
    localStorage.user = JSON.stringify(null);
  }

  public getSessionSecurityKey(): string {
    return localStorage.securityKey !== 'null' ? localStorage.securityKey : null;
  }

  public setSessionSecurityKey(token: string): void {
    localStorage.securityKey = token;
  }

  public getSessionSavedEmail(): string {
    return localStorage.savedEmail !== 'null' ? localStorage.savedEmail : null;
  }

  public setSessionSavedEmail(email: string): void {
    localStorage.savedEmail = email;
  }

}
