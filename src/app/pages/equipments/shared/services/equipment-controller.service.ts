import { Injectable } from '@angular/core';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ComputerService } from './computer.service';
import { MonitorService } from './monitor.service';
import { PrinterService } from './printer.service';
import { SectorDTO } from 'src/app/pages/sectors';
import { 
  ComputerDTO, PrinterDTO, MonitorDTO, ComputerNewDTO, PrinterNewDTO, 
  MonitorNewDTO, ArchitectureType, OperatingSystem, ComputerType, NetworkDeviceDTO, NetworkDeviceNewDTO
 } from '../models';
import { ElectronicService } from 'src/app/pages/shared-resources';
import { SearchEquipmentPage } from '../../search';
import { NetworkDeviceService } from './network-device.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentControllerService {
  public equipmentTypes: string[] =[
    "COMPUTER",
    "PRINTER",
    "NETWORK_DEVICE",
    "MONITOR",
  ];

  public electronicComponentTypes: string[] =[
    "PROCESSOR",
    "RAM_MEMORY",
    "STORAGE_DEVICE",
  ];
  
  public keys = Object.keys;

  public searchTerm: string= "";
  public asc: boolean = true;
  public orderBy: string = "patrimonyId";
  public equipmentType: string = "Computadores";
  
  public operatingSystemArchitectures = ArchitectureType;
  public operatingSystems = OperatingSystem;
  public computerTypes = ComputerType;

  public sectors: SectorDTO[];
  public computers: ComputerDTO[];
  public monitors: MonitorDTO[];
  public printers: PrinterDTO[];
  public networkDevices: NetworkDeviceDTO[];

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router, 
    private electronicService: ElectronicService, 
    private computerService: ComputerService,
    private monitorService: MonitorService,
    private printerService: PrinterService,
    private networkDeviceService: NetworkDeviceService
  ) { }

  findEquipment(id: string): Observable<any> {
    return this.electronicService.findById(id);
  }

  searchComputer(searchTerm: string, direction: string, orderBy: string) {
    this.computers = undefined;
    this.computerService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
      },
      error => {
        this.errorMessageAlert(error);
      });
  }

  searchPrinter(searchTerm: string, direction: string, orderBy: string) {
    this.printers = undefined;
    this.printerService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.printers = response.body.content;
      },
      error => {
        this.errorMessageAlert(error);
      });
  }

  searchNetworkDevice(searchTerm: string, direction: string, orderBy: string) {
    this.networkDevices = undefined;
    this.networkDeviceService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.networkDevices = response.body.content;
      },
      error => {
        this.errorMessageAlert(error);
      });
  }

  searchMonitor(searchTerm: string, direction: string, orderBy: string) {
    this.monitors = undefined;
    this.monitorService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.monitors = response.body.content;
      },
      error => {
        this.errorMessageAlert(error);
      });
  }

  updateComputersList(): void {
    this.computers = undefined;
    this.computerService.findAll()
      .subscribe(response => {
        this.computers = response;
      }, 
      error => {
        this.errorMessageAlert(error);
      });
  }

  updatePrintersList(): void {
    this.printers = undefined;
    this.printerService.findAll()
      .subscribe(response => {
        this.printers = response;
      }, 
      error => {
        this.errorMessageAlert(error);
      });
  }

  updateNetworkDevicesList(): void {
    this.networkDevices = undefined;
    this.networkDeviceService.findAll()
      .subscribe(response => {
        this.networkDevices = response;
      }, 
      error => {
        this.errorMessageAlert(error);
      });
  }

  updateMonitorsList(): void {
    this.monitors = undefined;
    this.monitorService.findAll()
      .subscribe(response => {
        this.monitors = response;
      }, 
      error => {
        this.errorMessageAlert(error);
      });
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

  createNetworkDevice(objetcNewDTO: NetworkDeviceNewDTO) {
    this.networkDeviceService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Dispositivo de rede criado com sucesso");
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
  
  updateNetworkDevice(id: string, object: NetworkDeviceNewDTO): void {
    this.networkDeviceService.update(id, object).subscribe(res => {
      this.successMessageAlert("Dispositivo de rede atualizado com sucesso");
      this.updateNetworkDevicesList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  updateMonitor(id: string, object: MonitorNewDTO): void {
    this.monitorService.update(id, object).subscribe(res => {
      this.successMessageAlert("Monitor atualizado com sucesso");
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

  deleteNetworkDevice(id: string): void {
    this.networkDeviceService.delete(id).subscribe(res => {
      this.successMessageAlert("Dispositivo de rede excluído com sucesso");
      this.updateNetworkDevicesList();
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

  getAvailableComputers(): Observable<ComputerDTO[]> {
    return this.computerService.findAvailable();
  }

  getAvailableMonitors(): Observable<MonitorDTO[]> {
    return this.monitorService.findAvailable();
  }

  redirectToRootPage(): void {
    this.router.navigate(['equipments']);
  }

  async searchModalPresent() {
    const modal = await this.modalController.create({
      component: SearchEquipmentPage,
      componentProps: { 
        searchTerm: this.searchTerm,
        asc: this.asc,
        orderBy: this.orderBy,
        equipmentType: this.equipmentType
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.searchTerm = dataReturned.data.searchTerm;
        this.asc = dataReturned.data.asc;
        this.orderBy = dataReturned.data.orderBy;
        
        if (this.equipmentType === 'Computadores')
          this.searchComputer(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
        else if (this.equipmentType === 'Impressoras')
          this.searchPrinter(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
          else if (this.equipmentType === 'Dispositivos de rede')
            this.searchNetworkDevice(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
        else if (this.equipmentType === 'Monitores')
          this.searchMonitor(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
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
