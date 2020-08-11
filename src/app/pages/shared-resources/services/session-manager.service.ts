import { Injectable } from '@angular/core';
import { User } from 'src/app/pages/authentication/login/shared';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor() { }

  public getSessionUser(){
    return localStorage['user'];
  }

  public setSessionUser(user: User){
    localStorage['user'] = user;
  }

  public getSessionToken() {
    return localStorage['token'];
  }

  public setSessionToken(token: string) {
    localStorage['token'] = token;
  }

  public getTokenExpirationDate() {
    return localStorage['token-expiration'];
  }

  public setTokenExpirationDate(token: string) {
    localStorage['token-expiration'] = token;
  }
  
}
