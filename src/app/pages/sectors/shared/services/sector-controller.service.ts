import { Injectable } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SectorService } from './sector.service';
import { Observable } from 'rxjs';
import { SectorDTO, SectorNewDTO } from '../models';
import { SearchSectorPage } from '../../search';
import { ToastMessageControllerService } from 'src/app/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class SectorControllerService {
  private searchTerm: string = "";
  private asc: boolean = true;
  private orderBy: string = "name";

  public sectors: SectorDTO[];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private toastMessageControllerService: ToastMessageControllerService,
    private sectorService: SectorService) { 
  }

  findSector(id: string): Observable<SectorDTO> {
    return this.sectorService.findById(id);
  }
  
  searchSector(searchTerm: string, direction: string, orderBy: string): void {
    this.sectors = undefined;
    this.sectorService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.sectors = response.body.content;
      },
      error => {
        //this.toastMessageControllerService.errorMessageAlert(error);
      });
  }

  findAllSectors(): Observable<SectorDTO[]> {
    return this.sectorService.findAll()
  }

  updateSectorsList(): void {
    this.sectors = undefined;
    this.sectorService.findAll()
      .subscribe(response => {
        this.sectors = response;
      },
      error => {
        //this.toastMessageControllerService.errorMessageAlert(error);
      });
  }

  createSector(objetcNewDTO: SectorNewDTO): void {
    if(objetcNewDTO.phone === "")
      objetcNewDTO.phone = null;
    this.sectorService.create(objetcNewDTO).subscribe(
      res => {
        this.toastMessageControllerService.successMessageAlert("Setor criado com sucesso");
        this.updateSectorsList();
        this.redirectToRootPage();
      },
      error => {
        //this.toastMessageControllerService.errorMessageAlert(error);
      }
    );
  }

  updateSector(id: string, objetcNewDTO: SectorNewDTO): void {
    if(objetcNewDTO.phone === "")
    objetcNewDTO.phone = null;
    this.sectorService.update(id, objetcNewDTO).subscribe(
      res => {
        this.toastMessageControllerService.successMessageAlert("Setor salvo com sucesso");
        this.updateSectorsList();
        this.redirectToRootPage();
      },
      error => {
        //this.toastMessageControllerService.errorMessageAlert(error);
      }
    );
  }

  deleteSector(id: string): void {
    this.sectorService.delete(id).subscribe(
      res => {
        this.toastMessageControllerService.successMessageAlert("Setor excluído com sucesso");
        this.updateSectorsList();
        this.redirectToRootPage();
      },
      error => {
        //this.toastMessageControllerService.errorMessageAlert(error);
      }
    );
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

        this.searchSector(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
      }
    });
    return await modal.present();
  }

}
