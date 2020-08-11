import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { SessionManagerService } from 'src/app/pages';
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
        this.sessionManagerService.setSessionToken(res.headers.get('Authorization'));
        console.log(res.headers.get('token-expiration'))
        this.sessionManagerService.setTokenExpirationDate(res.headers.get('token-expiration'));
        this.successMessageAlert("Logado com sucesso");
        //this.redirectToMainPage();
      },
      error => {
        console.log(error)
        this.errorMessageAlert(error);
      }
    );
  }

  redirectToMainPage(): void {
    this.router.navigate(['sectors']);
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
      message: 'Ocorreu um erro ao fazer login: ' + msg,
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
