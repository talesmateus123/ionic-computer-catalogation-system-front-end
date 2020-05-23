import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ComputerService } from './computer.service';
import { MonitorService } from './monitor.service';
import { PrinterService } from './printer.service';
import { SectorService, SectorDTO } from 'src/app/pages/sectors';
import { 
  ComputerDTO, PrinterDTO, MonitorDTO, ComputerNewDTO, PrinterNewDTO, 
  MonitorNewDTO, ArchitectureType, OperatingSystem
 } from '../models';
import { ElectronicService } from 'src/app/pages/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class EquipmentControllerService {
  public equipmentTypes: string[] =[
    "Computador",
    "Impressora",
    "Monitor",
  ];
  
  public keys = Object.keys;
  
  public operatingSystemArchitectures = ArchitectureType;
  public operatingSystems = OperatingSystem;

  public sectors: SectorDTO[];
  public computers: ComputerDTO[];
  public monitors: MonitorDTO[];
  public printers: PrinterDTO[];

  constructor(
    public alertController: AlertController, 
    private router: Router, 
    private electronicService: ElectronicService, 
    private computerService: ComputerService,
    private monitorService: MonitorService,
    private printerService: PrinterService, 
    private sectorService: SectorService) { }

  findEquipment(id: string): Observable<any> {
    return this.electronicService.findById(id);
  }

  updateComputersList(): void {
    this.computerService.findAll()
      .subscribe(response => {
        this.computers = response;
      }, 
      error => {
        console.log(error);
      });
  }

  updatePrintersList(): void {
    this.printerService.findAll()
      .subscribe(response => {
        this.printers = response;
      }, 
      error => {
        console.log(error);
      });
  }

  updateMonitorsList(): void {
    this.monitorService.findAll()
      .subscribe(response => {
        this.monitors = response;
      }, 
      error => {
        console.log(error);
      });
  }

  getAvailableComputers(): Observable<ComputerDTO[]> {
    return this.computerService.findAvailable();
  }

  getAvailableMonitors(): Observable<MonitorDTO[]> {
    return this.monitorService.findAvailable();
  }

  createComputer(objetcNewDTO: ComputerNewDTO) {
    this.computerService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Computador criado com sucesso");
      this.updateComputersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  createPrinter(objetcNewDTO: PrinterNewDTO) {
    this.printerService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Impressora criada com sucesso");
      this.updatePrintersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  createMonitor(objetcNewDTO: MonitorNewDTO) {
    this.monitorService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Monitor criado com sucesso");
      this.updateMonitorsList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  updateComputer(id: string, object: ComputerNewDTO): void {
    this.computerService.update(id, object).subscribe(res => {
      this.successMessageAlert("Computador atualizado com sucesso");
      this.updateComputersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }
  
  updatePrinter(id: string, object: PrinterNewDTO): void {
    this.printerService.update(id, object).subscribe(res => {
      this.successMessageAlert("Impressora atualizada com sucesso");
      this.updatePrintersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  updateMonitor(id: string, object: MonitorNewDTO): void {
    this.monitorService.update(id, object).subscribe(res => {
      this.successMessageAlert("Monitor atualizada com sucesso");
      this.updateMonitorsList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  deleteComputer(id: string): void {
    this.computerService.delete(id).subscribe(res => {
      this.successMessageAlert("Computador excluído com sucesso");
      this.updateComputersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  deletePrinter(id: string): void {
    this.printerService.delete(id).subscribe(res => {
      this.successMessageAlert("Impressora excluída com sucesso");
      this.updatePrintersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  deleteMonitor(id: string): void {
    this.monitorService.delete(id).subscribe(res => {
      this.successMessageAlert("Monitor excluído com sucesso");
      this.updateMonitorsList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  redirectToRootPage(): void {
    this.router.navigate(['equipments']);
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
