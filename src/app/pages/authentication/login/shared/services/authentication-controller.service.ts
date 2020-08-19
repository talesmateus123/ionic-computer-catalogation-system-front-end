import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { SessionManagerService } from '../services/session-manager.service';
import { AuthenticationService } from './authentication.service';
import { Login } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationControllerService {

  constructor(
    private toastController: ToastController,
    private router: Router,
    private sessionManagerService: SessionManagerService,
    private service: AuthenticationService,
    public http: HttpClient
  ) { }

  login(login: Login) {
    this.service.login(login).subscribe(
      res => {
        this.sessionManagerService.setTokenExpirationDate(res.headers.get('token-expiration'));
        this.sessionManagerService.successfulLogin(res.headers.get('Authorization'));
        this.successMessageAlert(null);
        this.redirectToMainPage();
      },
      error => {
        console.log(error)
        this.errorMessageAlert(error);
      }
    );
  }

  logout() {
    this.sessionManagerService.logout();
  }

  public isLoggedIn(): boolean {
    if(this.sessionManagerService.getSessionAuthorizationToken())
      return true;
    return false;
  }

  redirectToMainPage(): void {
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
