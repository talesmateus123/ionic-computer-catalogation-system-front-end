import { Injectable } from '@angular/core';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ComputerUserService } from './computer-user.service';
import { ComputerUserDTO, ComputerUserNewDTO } from '../models';
import { SearchComputerUserPage } from '../../search';

@Injectable({
  providedIn: 'root'
})
export class ComputerUserControllerService {
  public searchTerm: string = "";
  public asc: boolean = true;
  public orderBy: string = "name";

  public computerUsers: ComputerUserDTO[];

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router, 
    private computerUserService: ComputerUserService) { }
  
  findComputerUser(id: string): Observable<any> {
    return this.computerUserService.findById(id);
  }
  
  searchComputerUser(searchTerm: string, direction: string, orderBy: string) {
    this.computerUsers = undefined;
    this.computerUserService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computerUsers = response.body.content;
      },
      error => {
        console.log(error);
      });
  }

  updateComputerUsersList(): void {
    this.computerUsers = undefined;
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

  async modalPresent() {
    const modal = await this.modalController.create({
      component: SearchComputerUserPage,
      componentProps: { 
        searchTerm: this.searchTerm,
        asc: this.asc,
        orderBy: this.orderBy
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.searchTerm = dataReturned.data.searchTerm;
        this.asc = dataReturned.data.asc;
        this.orderBy = dataReturned.data.orderBy;

        this.searchComputerUser(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
      }
    });
    return await modal.present();
  }

  async loadingPresent() {
    this.loadingController.create({
      message: 'Carregando ...',
      spinner: 'circles' ,
      duration: 1500
    }).then(a => {
      a.present();
    });
  }

  async loadingDismiss() {
    this.loadingController.dismiss();
  }

  async successMessageAlert(msg: string) {
    const toast = await this.toastController.create({
      header: 'Sucesso',
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
    let msg: any;
    if (error.error.error === undefined)
      msg = "Erro desconhecido";
    else
      msg = error.error.error;
    const toast = await this.toastController.create({
      header: 'Opps!',
      message: 'Parece que ocorreu um erro: ' + msg,
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
