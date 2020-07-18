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
  public searchTerm: string = "";
  public asc: boolean = true;
  public orderBy: string = "name";

  public sectors: SectorDTO[];

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router,
    private sectorService: SectorService) { 
  }

  findSector(id: string): Observable<SectorDTO> {
    return this.sectorService.findById(id);
  }
  
  searchSector(searchTerm: string, direction: string, orderBy: string) {
    this.sectors = undefined;
    this.sectorService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.sectors = response.body.content;
      },
      error => {
        console.log(error);
      });
  }

  updateSectorsList() {
    this.sectors = undefined;
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

  async modalPresent() {
    const modal = await this.modalController.create({
      component: SearchSectorPage,
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

        this.searchSector(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
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
