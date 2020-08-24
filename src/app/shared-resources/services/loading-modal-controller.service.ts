import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingModalControllerService {

  constructor(
    private loadingController: LoadingController
  ) { }

  async loadingPresent(msg?: string) {
    await this.loadingController.create({
      message: msg ? msg : 'Carregando...',
      spinner: 'crescent' ,
    }).then(a => {
      a.present();
    });
  }

  async loadingDismiss() {
    await this.loadingController.getTop().then(loading => {
      loading ? this.loadingController.dismiss() : null;
    })
  }

}
