import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { SessionStorageService } from './session-storage.service';
import { AuthenticationService } from './authentication.service';
import { Login, ClientDTO } from '../models';
import { ClientService } from 'src/app/pages/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationControllerService {

  constructor(
    private toastController: ToastController,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private service: AuthenticationService,
    private clientService: ClientService,
    public http: HttpClient
  ) { }

  public login(login: Login) {
    this.service.login(login).toPromise().then(async (res) => {
      this.successfulLogin(res.headers.get('Authorization'));
      await this.setSessionUser(res.headers.get('user-id'));
      this.successMessageAlert(null);
      this.redirectToEquipmentsPage();
    })
  }

  public logout() {
    this.sessionStorageService.setSessionUserId(null);
    this.sessionStorageService.setSessionUserEmail(null);
    this.sessionStorageService.setSessionUserName(null);
    this.sessionStorageService.setSessionUserAdminRole(null);
    this.sessionStorageService.setSessionUserClientRole(null);
    this.sessionStorageService.setSessionAuthorizationToken(null);
    this.redirectToLoginPage();
  }

  private successfulLogin(authorizationValue: string) {
    this.sessionStorageService.setSessionAuthorizationToken(authorizationValue.substring(7));
  }

  public getSessionUser(): ClientDTO {
    if(this.sessionStorageService.getSessionAuthorizationToken() 
     && this.sessionStorageService.getSessionUserEmail()
     && this.sessionStorageService.getSessionUserName()) {
      let user: ClientDTO = {
        id: this.sessionStorageService.getSessionUserId(),
        email: this.sessionStorageService.getSessionUserEmail(),
        name: this.sessionStorageService.getSessionUserName()
      }
      if(this.sessionStorageService.sessionUserHasAdminRole())
        user.hasAdminProfile = true;
      if(this.sessionStorageService.sessionUserHasClientRole())
        user.hasClientProfile = true;
      return user;
    }
    return null;
  }

  private async setSessionUser(userId: string) {
    this.clientService.findById(userId).subscribe(
      async res => {
        this.sessionStorageService.setSessionUserId(res.id);
        this.sessionStorageService.setSessionUserEmail(res.email);
        this.sessionStorageService.setSessionUserName(res.name);
        res.profiles.forEach((profile) => {
          if(profile === "ADMIN") this.sessionStorageService.setSessionUserAdminRole(true);
          else if (profile ==="CLIENT") this.sessionStorageService.setSessionUserClientRole(true);
        })

        console.log(this.getSessionUser());
      },
      error => {
        console.log(error)
        this.errorMessageAlert(error);
      }
    );
  }

  public getSessionAuthorizationToken(): string {
    return this.sessionStorageService.getSessionAuthorizationToken();
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
