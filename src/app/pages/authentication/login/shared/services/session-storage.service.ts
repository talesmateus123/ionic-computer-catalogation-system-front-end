import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public getSessionUserEmail(): string {
    return localStorage['user-email'] !== "null" ? localStorage['user-email'] : null;
  }

  public setSessionUserEmail(userMail: String): void {
    localStorage['user-email'] = userMail;
  }

  public getSessionAuthorizationToken(): string {
    return localStorage['authorization-token'] !== "null" ? localStorage['authorization-token'] : null;
  }

  public setSessionAuthorizationToken(token: string): void {
    localStorage['authorization-token'] = token;
  }

  public getTokenExpirationDate(): string {
    return localStorage['token-expiration'] !== "null" ? localStorage['token-expiration'] : null;
  }

  public setTokenExpirationDate(token: string): void {
    localStorage['token-expiration'] = token ? token.substring(7) : token;
  }
  
}
