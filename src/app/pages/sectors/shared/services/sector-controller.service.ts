import { Injectable } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SectorService } from './sector.service';
import { SectorDTO, SectorNewDTO } from '../models';
import { SearchSectorPage } from '../../search';
import { LoadingModalControllerService, ToastMessageControllerService } from 'src/app/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class SectorControllerService {
  private searchTerm: string = '';
  private asc: boolean = true;
  private orderBy: string = 'name';

  public sectors: SectorDTO[];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private loadingModalControllerService: LoadingModalControllerService,
    private toastMessageControllerService: ToastMessageControllerService,
    private sectorService: SectorService) {
  }

  findSector(id: string): Observable<SectorDTO> {
    return this.sectorService.findById(id);
  }

  searchSector(searchTerm: string, direction: string, orderBy: string): void {
    this.sectors = undefined;
    this.sectorService.search(searchTerm, direction, orderBy)
      .subscribe(res => {
        this.sectors = res.body.content;
      },
      error => {

      });
  }

  findAllSectors(): Observable<SectorDTO[]> {
    return this.sectorService.findAll()
  }

  updateSectorsList(): void {
    this.sectors = undefined;
    this.sectorService.findAll()
      .subscribe(
        res => {
        this.sectors = res;
      },
      error => {
        
      });
  }

  async createSector(objetcNewDTO: SectorNewDTO) {
    await this.loadingModalControllerService.loadingPresent('Salvando');
    if (objetcNewDTO.phone === '')
      objetcNewDTO.phone = null;
    this.sectorService.create(objetcNewDTO)
      .subscribe(
        res => {
          this.toastMessageControllerService.successMessageAlert('Setor criado com sucesso');
          this.loadingModalControllerService.loadingDismiss();
          this.updateSectorsList();
          this.redirectToRootPage();
        },
        error => {
          
        });
  }

  async updateSector(id: string, objetcNewDTO: SectorNewDTO){
    await this.loadingModalControllerService.loadingPresent('Salvando');
    if (objetcNewDTO.phone === '')
      objetcNewDTO.phone = null;
    this.sectorService.update(id, objetcNewDTO)
      .subscribe(
        res => {
          this.toastMessageControllerService.successMessageAlert('Setor salvo com sucesso');
          this.loadingModalControllerService.loadingDismiss();
          this.updateSectorsList();
          this.redirectToRootPage();
        },
        error => {
        
        });
  }

  async deleteSector(id: string) {
    await this.loadingModalControllerService.loadingPresent('Excluindo');
    this.sectorService.delete(id)
      .subscribe(
        res => {
          this.toastMessageControllerService.successMessageAlert('Setor excluído com sucesso');
          this.loadingModalControllerService.loadingDismiss();
          this.updateSectorsList();
          this.redirectToRootPage();
        },
        error => {
          
        });
  }

  redirectToRootPage(): void {
    this.router.navigate(['sectors']);
  }

  async searchModalPresent() {
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

        this.searchSector(dataReturned.data.searchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
      }
    });
    return await modal.present();
  }

}
