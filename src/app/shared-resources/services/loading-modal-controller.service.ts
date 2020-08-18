import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingModalControllerService {

  constructor(private loadingController: LoadingController) { }

  async loadingPresent() {
    await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent' ,
    }).then(a => {
      a.present();
    });
  }

  async loadingDismiss() {
    await this.loadingController.dismiss();
  }

}
