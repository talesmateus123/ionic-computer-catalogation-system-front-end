import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ComputerUserService } from './computer-user.service';
import { ComputerUserDTO, ComputerUserNewDTO } from '../models';
import { SearchComputerUserPage } from '../../search';
import { ToastMessageControllerService } from 'src/app/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class ComputerUserControllerService {
  public searchTerm: string = "";
  public asc: boolean = true;
  public orderBy: string = "name";

  public computerUsers: ComputerUserDTO[];

  constructor(
    private modalController: ModalController,
    private router: Router, 
    private toastMessageControllerService: ToastMessageControllerService,
    private computerUserService: ComputerUserService) { }
  
  findComputerUser(id: string): Observable<any> {
    return this.computerUserService.findById(id);
  }
  
  searchComputerUser(searchTerm: string, direction: string, orderBy: string): void {
    this.computerUsers = undefined;
    this.computerUserService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computerUsers = response.body.content;
      },
      error => {
        
      });
  }

  updateComputerUsersList(): void {
    this.computerUsers = undefined;
    this.computerUserService.findAll()
      .subscribe(response => {
        this.computerUsers = response;
      },
      error => {

      });
  }

  createComputerUser(objetcNewDTO: ComputerUserNewDTO): void {
    if(objetcNewDTO.lastName === "")
      objetcNewDTO.lastName = null;
    if(objetcNewDTO.email === "")
      objetcNewDTO.email = null;

    this.computerUserService.create(objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Usuário criado com sucesso");
        this.updateComputerUsersList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  updateComputerUser(id: string, objetcNewDTO: ComputerUserNewDTO): void {
    if(objetcNewDTO.lastName === "")
      objetcNewDTO.lastName = null;
    if(objetcNewDTO.email === "")
      objetcNewDTO.email = null;

    this.computerUserService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Usuário atualizado com sucesso");
        this.updateComputerUsersList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }
  
  deleteComputerUser(id: string): void {
    this.computerUserService.delete(id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Usuário excluído com sucesso");
        this.updateComputerUsersList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  redirectToRootPage(): void {
    this.router.navigate(['computer-users']);
  }

  async searchModalPresent() {
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

}
