import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor() { }

  public getSessionUserEmail(): string {
    return localStorage['user-email'];
  }

  public setSessionUserEmail(userMail: String): void {
    localStorage['user-email'] = userMail;
  }

  public getSessionAuthorizationToken(): string {
    return localStorage['authorization-token'];
  }

  public setSessionAuthorizationToken(token: string): void {
    localStorage['authorization-token'] = token;
  }

  public getTokenExpirationDate(): void {
    return localStorage['token-expiration'];
  }

  public setTokenExpirationDate(token: string): void {
    localStorage['token-expiration'] = token.substring(7);
  }

  public successfulLogin(authorizationValue: string): void {
    let tok = authorizationValue.substring(7);
    this.setSessionUserEmail(jwt_decode(tok).sub);
    this.setSessionAuthorizationToken(tok);
  }

  public logout(): void {
    this.setSessionUserEmail(null);
    this.setSessionAuthorizationToken(null);
  }
  
}
