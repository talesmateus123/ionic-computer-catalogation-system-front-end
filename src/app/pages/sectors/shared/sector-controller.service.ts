import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SectorService } from './sector.service';
import { Observable } from 'rxjs';
import { SectorDTO } from 'src/app/models/sector.dto';
import { SectorNewDTO } from 'src/app/models/sector_new.dto';

@Injectable({
  providedIn: 'root'
})
export class SectorControllerService {
  public sectors: SectorDTO[];

  constructor(
    public alertController: AlertController, 
    private router: Router,
    private sectorService: SectorService) { 
  }

  findSector(id: string): Observable<SectorDTO> {
    return this.sectorService.findById(id);
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
