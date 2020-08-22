import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public getSessionUserId(): string {
    return localStorage['user-id'] !== "null" ? localStorage['user-id'] : null;
  }

  public setSessionUserId(id: string): void {
    localStorage['user-id'] = id;
  }

  public getSessionUserEmail(): string {
    return localStorage['user-email'] !== "null" ? localStorage['user-email'] : null;
  }

  public setSessionUserEmail(userMail: string): void {
    localStorage['user-email'] = userMail;
  }

  public getSessionUserName(): string {
    return localStorage['user-name'] !== "null" ? localStorage['user-name'] : null;
  }

  public setSessionUserName(name: string): void {
    localStorage['user-name'] = name;
  }

  public sessionUserHasAdminRole(): boolean {
    return localStorage['user-admin-role'] === "true" ? true : false;
  }

  public setSessionUserAdminRole(isSessionUserAdminProfile: boolean): void {
    localStorage['user-admin-role'] = isSessionUserAdminProfile;
  }

  public sessionUserHasClientRole(): boolean {
    return localStorage['user-client-role'] === "true" ? true : false;
  }

  public setSessionUserClientRole(isSessionUserClientProfile: boolean): void {
    localStorage['user-client-role'] = isSessionUserClientProfile;
  }

  public getSessionAuthorizationToken(): string {
    return localStorage['authorization-token'] !== "null" ? localStorage['authorization-token'] : null;
  }

  public setSessionAuthorizationToken(token: string): void {
    localStorage['authorization-token'] = token;
  }
  
}
