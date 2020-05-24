import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ComputerUserService } from './computer-user.service';
import { ComputerUserDTO, ComputerUserNewDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ComputerUserControllerService {
  public computerUsers: ComputerUserDTO[];

  constructor(
    public alertController: AlertController, 
    public loadingController: LoadingController,
    private router: Router, 
    private computerUserService: ComputerUserService) { }
  
  findComputerUser(id: string): Observable<any> {
    return this.computerUserService.findById(id);
  }

  updateComputerUsersList(): void {
    this.computerUserService.findAll()
      .subscribe(response => {
        this.computerUsers = response;
      }, 
      error => {
        console.log(error);
      });
  }

  createComputerUser(objetcNewDTO: ComputerUserNewDTO) {
    this.computerUserService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Usuário criado com sucesso");
      this.updateComputerUsersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  updateComputerUser(id: string, object: ComputerUserNewDTO): void {
    this.computerUserService.update(id, object).subscribe(res => {
      this.successMessageAlert("Usuário atualizado com sucesso");
      this.updateComputerUsersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }
  
  deleteComputerUser(id: string): void {
    this.computerUserService.delete(id).subscribe(res => {
      this.successMessageAlert("Usuário excluído com sucesso");
      this.updateComputerUsersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }


  redirectToRootPage(): void {
    this.router.navigate(['computer-users']);
  }

  async loadingPresent() {
    await this.loadingController.create({
      message: 'Carregando ...',
      spinner: 'circles' ,
      duration: 1500
    }).then(a => {
      a.present();
    });
  }

  async loadingDismiss() {
    await this.loadingController.dismiss();
  }

  async successMessageAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      //subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async errorMessageAlert(error: any) {
    let msg: any;
    if (error.error.error === undefined)
      msg = "Erro desconhecido";
    else
      msg = error.error.error;
    const alert = await this.alertController.create({
      header: 'Opps!',
      //subHeader: 'Subtitle',
      message: 'Parece que ocorreu um erro: ' + msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
