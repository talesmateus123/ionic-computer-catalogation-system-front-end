import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageControllerService {
  private duration: number = 3500;

  constructor(
    private toastController: ToastController
  ) { }

  async successMessageAlert(msg: string, header?: string) {
    const toast = await this.toastController.create({
      header: header ? header : 'Sucesso!',
      message: msg,
      position: 'bottom',
      duration: this.duration,
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

  async errorMessageAlert(header: string, msg?: string) {
    const toast = await this.toastController.create({
      header: header,
      message: msg ? msg : null,
      position: 'bottom',
      duration: this.duration,
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
