import { Injectable } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
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
import { SearchEquipmentModalPage } from '../../modals/search';
import { NetworkDeviceService } from './network-device.service';
import { ToastMessageControllerService } from 'src/app/shared-resources';

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
  public booleanSearchTerm: boolean = true;
  public asc: boolean = true;
  public orderBy: string = "patrimonyId";
  public equipmentType: string = "Computadores";
  public searchType: string = "DEFAULT";
  
  public operatingSystemArchitectures = ArchitectureType;
  public operatingSystems = OperatingSystem;
  public computerTypes = ComputerType;

  public sectors: SectorDTO[];
  public computers: ComputerDTO[];
  public monitors: MonitorDTO[];
  public printers: PrinterDTO[];
  public networkDevices: NetworkDeviceDTO[];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private toastMessageControllerService: ToastMessageControllerService,
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
        
      });
  }

  searchComputerProcessor(searchTerm: string, direction: string, orderBy: string) {
    this.computers = undefined;
    this.computerService.searchComputerProcessor(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
      }, 
      error => {
        
      });
  }

  searchComputerComputerUser(searchTerm: string, direction: string, orderBy: string) {
    this.computers = undefined;
    this.computerService.searchComputerComputerUser(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
      }, 
      error => {
        
      });
  }

  searchComputerOnline(searchTerm: string, direction: string, orderBy: string) {
    this.computers = undefined;
    this.computerService.searchComputerOnline(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
      }, 
      error => {
        
      });
  }

  searchComputerOnTheDomain(searchTerm: string, direction: string, orderBy: string) {
    this.computers = undefined;
    this.computerService.searchComputerOnTheDomain(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
      }, 
      error => {
        
      });
  }

  searchComputerPersonalComputer(searchTerm: string, direction: string, orderBy: string) {
    this.computers = undefined;
    this.computerService.searchComputerPersonalComputer(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
      }, 
      error => {
        
      });
  }

  searchPrinter(searchTerm: string, direction: string, orderBy: string) {
    this.printers = undefined;
    this.printerService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.printers = response.body.content;
      }, 
      error => {
        
      });
  }

  searchNetworkDevice(searchTerm: string, direction: string, orderBy: string) {
    this.networkDevices = undefined;
    this.networkDeviceService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.networkDevices = response.body.content;
      }, 
      error => {
        
      });
  }

  searchMonitor(searchTerm: string, direction: string, orderBy: string) {
    this.monitors = undefined;
    this.monitorService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.monitors = response.body.content;
      }, 
      error => {
        
      });
  }

  async updateComputersList() {
    this.computers = undefined;
    await this.computerService.findAll()
      .toPromise().then(response => {
        this.computers = response;
      })
      .catch(() => {

      });
  }

  async updatePrintersList() {
    this.printers = undefined;
    await this.printerService.findAll()
      .toPromise().then(response => {
        this.printers = response;
      })
      .catch(() => {

      });
  }

  async updateNetworkDevicesList() {
    this.networkDevices = undefined;
    await this.networkDeviceService.findAll()
      .toPromise().then(response => {
        this.networkDevices = response;
      })
      .catch(() => {

      });
  }

  async updateMonitorsList() {
    this.monitors = undefined;
    await this.monitorService.findAll()
      .toPromise().then(response => {
        this.monitors = response;
      })
      .catch(() => {

      });
  }

  createComputer(objetcNewDTO: ComputerNewDTO) {
    if(objetcNewDTO.ipAddress === "")
      objetcNewDTO.ipAddress = null;
    if(objetcNewDTO.macAddress === "")
      objetcNewDTO.macAddress = null;
    this.computerService.create(objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Computador criado com sucesso");
        this.updateComputersList();
        this.redirectToRootPage();
      }, 
      error => {
        
      });
  }

  createPrinter(objetcNewDTO: PrinterNewDTO) {
    if(objetcNewDTO.ipAddress === "")
      objetcNewDTO.ipAddress = null;
    if(objetcNewDTO.macAddress === "")
      objetcNewDTO.macAddress = null;
    this.printerService.create(objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Impressora criada com sucesso");
        this.updatePrintersList();
        this.redirectToRootPage();
      }, 
      error => {
        
      });
  }

  createNetworkDevice(objetcNewDTO: NetworkDeviceNewDTO) {
    if(objetcNewDTO.ipAddress === "")
      objetcNewDTO.ipAddress = null;
    if(objetcNewDTO.macAddress === "")
      objetcNewDTO.macAddress = null;
    this.networkDeviceService.create(objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Dispositivo de rede criado com sucesso");
        this.updateNetworkDevicesList();
        this.redirectToRootPage();
      }, 
      error => {
        
      });
  }

  createMonitor(objetcNewDTO: MonitorNewDTO) {
    this.monitorService.create(objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Monitor criado com sucesso");
        this.updateMonitorsList();
        this.redirectToRootPage();
      }, 
      error => {
        
      });
  }

  updateComputer(id: string, objetcNewDTO: ComputerNewDTO): void {
    if(objetcNewDTO.ipAddress === "")
      objetcNewDTO.ipAddress = null;
    if(objetcNewDTO.macAddress === "")
      objetcNewDTO.macAddress = null;
    this.computerService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Computador atualizado com sucesso");
        this.updateComputersList();
        this.redirectToRootPage();
      }, 
      error => {
        
      });
  }
  
  updatePrinter(id: string, objetcNewDTO: PrinterNewDTO): void {
    if(objetcNewDTO.ipAddress === "")
      objetcNewDTO.ipAddress = null;
    if(objetcNewDTO.macAddress === "")
      objetcNewDTO.macAddress = null;
    this.printerService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Impressora atualizada com sucesso");
        this.updatePrintersList();
        this.redirectToRootPage();
      }, 
      error => {
        
      });
  }
  
  updateNetworkDevice(id: string, objetcNewDTO: NetworkDeviceNewDTO): void {
    if(objetcNewDTO.ipAddress === "")
      objetcNewDTO.ipAddress = null;
    if(objetcNewDTO.macAddress === "")
      objetcNewDTO.macAddress = null;
    this.networkDeviceService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Dispositivo de rede atualizado com sucesso");
        this.updateNetworkDevicesList();
        this.redirectToRootPage();
      }, 
      error => {
        
      });
  }

  updateMonitor(id: string, objetcNewDTO: MonitorNewDTO): void {
    this.monitorService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Monitor atualizado com sucesso");
        this.updateMonitorsList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  deleteComputer(id: string): void {
    this.computerService.delete(id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Computador excluído com sucesso");
        this.updateComputersList();
        this.redirectToRootPage();
      }, 
      error => {
        
      });
  }

  deletePrinter(id: string): void {
    this.printerService.delete(id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Impressora excluída com sucesso");
        this.updatePrintersList();
        this.redirectToRootPage();
      }, 
      error => {
        
      });
  }

  deleteNetworkDevice(id: string): void {
    this.networkDeviceService.delete(id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Dispositivo de rede excluído com sucesso");
        this.updateNetworkDevicesList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  deleteMonitor(id: string): void {
    this.monitorService.delete(id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert("Monitor excluído com sucesso");
        this.updateMonitorsList();
        this.redirectToRootPage();
      }, 
      error => {
        
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
      component: SearchEquipmentModalPage,
      componentProps: { 
        searchTerm: this.searchTerm,
        booleanSearchTerm: this.booleanSearchTerm,
        asc: this.asc,
        orderBy: this.orderBy,
        searchType: this.searchType,
        equipmentType: this.equipmentType
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.searchTerm = dataReturned.data.searchTerm;
        this.booleanSearchTerm = dataReturned.data.booleanSearchTerm;
        this.asc = dataReturned.data.asc;
        this.orderBy = dataReturned.data.orderBy;
        this.searchType = dataReturned.data.searchType;

        if (this.equipmentType === 'Computadores') {
          if(this.searchType === "DEFAULT")
            this.searchComputer(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
          else if(this.searchType === "COMPUTER_PROCESSOR")
            this.searchComputerProcessor(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
          else if(this.searchType === "COMPUTER_COMPUTER_USER")
            this.searchComputerComputerUser(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
          else if(this.searchType === "COMPUTER_ONLINE")
            this.searchComputerOnline(dataReturned.data.booleanSearchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
          else if(this.searchType === "COMPUTER_ON_THE_DOMAIN")
            this.searchComputerOnTheDomain(dataReturned.data.booleanSearchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
          else if(this.searchType === "COMPUTER_PERSONAL_COMPUTER")
            this.searchComputerPersonalComputer(dataReturned.data.booleanSearchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
        }
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

}
