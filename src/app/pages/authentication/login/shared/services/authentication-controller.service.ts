import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SessionStorageService } from './session-storage.service';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';
import { Login, ClientDTO } from '../models';
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
    await this.service.login(login)
      .toPromise().then(async response => {
        await this.sessionStorageService.setSessionSecurityKey(response.headers.get('Authorization').substring(7));
        await this.findSessionUser(response.headers.get('user-id'));
        this.toastMessageControllerService.successMessageAlert(null, 'Logado com sucesso!');
        this.redirectToEquipmentsPage();
        this.loadingModalControllerService.loadingDismiss();
      })
      .catch(() => {

      })
  }

  public logout() {
    this.user = null;
    this.sessionStorageService.setSessionSecurityKey(null);
    this.redirectToLoginPage();
  }

  private findSessionUser(userId: string) {
    this.clientService.findById(userId).
      subscribe(
        res => {
          this.sessionStorageService.setSessionUser(res);
          this.user = res;
        }, 
        error => {
          
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

  public isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  public redirectToLoginPage(): void {
    this.router.navigate(['login']);
  }

  public redirectToEquipmentsPage(): void {
    this.router.navigate(['equipments']);
  }

}
