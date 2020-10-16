import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode';

import { SessionStorageService } from './session-storage.service';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';
import { Login, ClientDTO } from '../models';
import { AuthUtilService } from './../../../shared-resources';
import { LoadingModalControllerService, ToastMessageControllerService } from 'src/app/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationControllerService {
  constructor(
    private toastMessageControllerService: ToastMessageControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private service: AuthenticationService,
    private clientService: ClientService
  ) { }

  public async login(login: Login) {
    await this.loadingModalControllerService.loadingPresent('Entrando...');
    this.service.login(login)
      .toPromise().then(async response => {
        const securityKey = await response.headers.get('Authorization').substring(7);
        this.sessionStorageService.setSessionSecurityKey(securityKey);
        await this.findSessionUser(securityKey);
        this.scheduleToWarnExpiratingToken();
        this.toastMessageControllerService.successMessageAlert(null, 'Logado com sucesso!');
        this.redirectToEquipmentsPage();
        this.loadingModalControllerService.loadingDismiss();
      });
  }

  public logout() {
    this.user = null;
    this.sessionStorageService.setSessionSecurityKey(null);
    this.redirectToLoginPage();
  }

  private async findSessionUser(securityKey: string) {
    const email = await jwt_decode(securityKey).sub;

    await this.clientService.findByEmail(email)
      .toPromise().then(
        res => {
          this.sessionStorageService.setSessionUser(res);
          this.user = res;
        });
  }

  get user() {
    return this.sessionStorageService.getSessionUser();
  }

  set user(user: ClientDTO) {
    this.sessionStorageService.setSessionUser(user);
  }

  public getSessionSecurityKey(): string {
    return this.sessionStorageService.getSessionSecurityKey();
  }

  public getSessionSavedEmail(): string {
    return this.sessionStorageService.getSessionSavedEmail();
  }

  public setSessionSavedEmail(email: string) {
    return this.sessionStorageService.setSessionSavedEmail(email);
  }


  public isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  public redirectToLoginPage(): void {
    this.router.navigate(['login']);
  }

  public redirectToEquipmentsPage(): void {
    this.router.navigate(['equipments']);
  }

  private scheduleToWarnExpiratingToken() {
    const toWarnExpiratingToken = () => {
        this.toastMessageControllerService.successMessageAlert(
          'Salve todas as alterações antes que a sessão expire.',
          'A sessão está prestes a expirar...',
        );
      };

    setTimeout(toWarnExpiratingToken, 1000000);
  }

}
