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

  async successMessageAlert(message: string, header?: string) {
    const toast = await this.toastController.create({
      header: header ? header : 'Sucesso!',
      message,
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

  async errorMessageAlert(header: string, message?: string) {
    const toast = await this.toastController.create({
      header,
      message: message ? message : null,
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
