import { Injectable } from '@angular/core';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SectorService } from './sector.service';
import { Observable } from 'rxjs';
import { SectorDTO, SectorNewDTO } from '../models';
import { SearchSectorPage } from '../../search';

@Injectable({
  providedIn: 'root'
})
export class SectorControllerService {
  public sectors: SectorDTO[];

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public modalController: ModalController,
    private router: Router,
    private sectorService: SectorService) { 
  }

  findSector(id: string): Observable<SectorDTO> {
    return this.sectorService.findById(id);
  }
  
  searchSector(searchTerm: string, direction: string, orderBy: string) {
    this.sectorService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        console.log(response.body.content)
        this.sectors = response.body.content;
      },
      error => {
        console.log(error);
      });
  }

  updateSectorsList() {
    this.sectorService.findAll()
      .subscribe(response => {
        this.sectors = response;
      },
      error => {
        console.log(error);
      });
  }

  createSector(sector: SectorNewDTO){
    this.sectorService.create(sector).subscribe(
      res => {
        this.successMessageAlert("Setor criado com sucesso");
        this.updateSectorsList();
        this.redirectToRootPage();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  updateSector(id: string, sector: SectorNewDTO){
    this.sectorService.update(id, sector).subscribe(
      res => {
        this.successMessageAlert("Setor salvo com sucesso");
        this.updateSectorsList();
        this.redirectToRootPage();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  deleteSector(id: string){
    this.sectorService.delete(id).subscribe(
      res => {
        this.successMessageAlert("Setor excluído com sucesso");
        this.updateSectorsList();
        this.redirectToRootPage();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  redirectToRootPage(): void {
    this.router.navigate(['sectors']);
  }

  async modalPresent(controller: SectorControllerService) {
    const modal = await this.modalController.create({
      component: SearchSectorPage,
      componentProps: {
        controller: controller,
     }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null || dataReturned !== undefined) {
        //console.log(dataReturned.data);
        this.searchSector(dataReturned.data.searchTerm, dataReturned.data.direction, dataReturned.data.orderBy);
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
