import { Injectable } from '@angular/core';
import { User } from 'src/app/pages/authentication/login/shared';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor() { }

  public getSessionUserEmail(){
    return localStorage['user-email'];
  }

  public setSessionUserEmail(user: User){
    localStorage['user-email'] = user;
  }

  public getSessionAuthorizationToken() {
    return localStorage['authorization-token'];
  }

  public setSessionToken(token: string) {
    localStorage['authorization-token'] = token;
  }

  public getTokenExpirationDate() {
    return localStorage['token-expiration'];
  }

  public setTokenExpirationDate(token: string) {
    localStorage['token-expiration'] = token.substring(7);
  }

  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    this.setSessionUserEmail(jwt_decode(tok).sub);
    this.setSessionToken(tok);
  }

  public logout() {
    this.setSessionUserEmail(null);
    this.setSessionToken(null);
  }
  
}
