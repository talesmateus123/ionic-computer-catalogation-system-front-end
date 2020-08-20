import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as jwt_decode from 'jwt-decode';

import { SessionStorageService } from './session-storage.service';
import { AuthenticationService } from './authentication.service';
import { Login, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationControllerService {

  constructor(
    private toastController: ToastController,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private service: AuthenticationService,
    public http: HttpClient
  ) { }

  public login(login: Login) {
    this.service.login(login).subscribe(
      res => {
        this.successfulLogin(res.headers.get('Authorization'), res.headers.get('token-expiration'));
        this.successMessageAlert(null);
        this.redirectToEquipmentsPage();
      },
      error => {
        console.log(error)
        this.errorMessageAlert(error);
      }
    );
  }

  public logout() {
    this.sessionStorageService.setSessionAuthorizationToken(null);
    this.sessionStorageService.setSessionUserEmail(null);
    this.sessionStorageService.setTokenExpirationDate(null);
    this.redirectToLoginPage();
  }

  public getSessionUser(): User {
    if(this.sessionStorageService.getSessionAuthorizationToken() !== null 
     && this.sessionStorageService.getSessionUserEmail() !== null
     && this.sessionStorageService.getTokenExpirationDate() !== null) {
      return {
        token: this.sessionStorageService.getSessionAuthorizationToken(),
        email: this.sessionStorageService.getSessionUserEmail(),
        tokenExpiration: this.sessionStorageService.getTokenExpirationDate()
      }
    }
    return null;
  }

  public successfulLogin(authorizationValue: string, tokenExpiration: string): void {
    let tok = authorizationValue.substring(7);
    this.sessionStorageService.setSessionUserEmail(jwt_decode(tok).sub);
    this.sessionStorageService.setSessionAuthorizationToken(tok);
    this.sessionStorageService.setTokenExpirationDate(tokenExpiration);
  }

  public isLoggedIn(): boolean {
    if(this.getSessionUser() !== null)
      return true;
    return false;
  }

  public redirectToLoginPage(): void {
    this.router.navigate(['login']);
  }

  public redirectToEquipmentsPage(): void {
    this.router.navigate(['equipments']);
  }

  async successMessageAlert(msg: string) {
    const toast = await this.toastController.create({
      header: 'Logado com sucesso',
      message: msg,
      position: 'bottom',
      duration: 2500,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  async errorMessageAlert(error: any) {
    let msg: string = error;
    const toast = await this.toastController.create({
      header: 'Opps!',
      message: msg,
      position: 'bottom',
      duration: 2500,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }
}
