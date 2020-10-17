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
import { LoadingModalControllerService, ToastMessageControllerService } from 'src/app/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class EquipmentControllerService {
  public equipmentTypes: string[] = [
    'COMPUTER',
    'PRINTER',
    'NETWORK_DEVICE',
    'MONITOR',
  ];

  public electronicComponentTypes: string[] = [
    'PROCESSOR',
    'RAM_MEMORY',
    'STORAGE_DEVICE',
  ];

  public keys = Object.keys;

  public filledList = false;

  public searchTerm = '';
  public booleanSearchTerm = true;
  public asc = true;
  public orderBy = 'patrimonyId';
  public equipmentType = 'Computadores';
  public searchType = 'DEFAULT';

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
    private loadingModalControllerService: LoadingModalControllerService,
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
    this.filledList = false;
    this.computers = undefined;
    this.computerService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
        this.filledList = true;
      });
  }

  searchComputerProcessor(searchTerm: string, direction: string, orderBy: string) {
    this.filledList = false;
    this.computers = undefined;
    this.computerService.searchComputerProcessor(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
        this.filledList = true;
      });
  }

  searchComputerComputerUser(searchTerm: string, direction: string, orderBy: string) {
    this.filledList = false;
    this.computers = undefined;
    this.computerService.searchComputerComputerUser(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
        this.filledList = true;
      });
  }

  searchComputerOnline(searchTerm: string, direction: string, orderBy: string) {
    this.filledList = false;
    this.computers = undefined;
    this.computerService.searchComputerOnline(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
        this.filledList = true;
      });
  }

  searchComputerOnTheDomain(searchTerm: string, direction: string, orderBy: string) {
    this.filledList = false;
    this.computers = undefined;
    this.computerService.searchComputerOnTheDomain(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
        this.filledList = true;
      });
  }

  searchComputerPersonalComputer(searchTerm: string, direction: string, orderBy: string) {
    this.filledList = false;
    this.computers = undefined;
    this.computerService.searchComputerPersonalComputer(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.computers = response.body.content;
        this.filledList = true;
      });
  }

  searchPrinter(searchTerm: string, direction: string, orderBy: string) {
    this.filledList = false;
    this.printers = undefined;
    this.printerService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.printers = response.body.content;
        this.filledList = true;
      });
  }

  searchNetworkDevice(searchTerm: string, direction: string, orderBy: string) {
    this.filledList = false;
    this.networkDevices = undefined;
    this.networkDeviceService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.networkDevices = response.body.content;
        this.filledList = true;
      });
  }

  searchMonitor(searchTerm: string, direction: string, orderBy: string) {
    this.filledList = false;
    this.monitors = undefined;
    this.monitorService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.monitors = response.body.content;
        this.filledList = true;
      });
  }

  async updateComputersList() {
    this.filledList = false;
    this.computers = undefined;
    await this.computerService.findAll()
      .toPromise().then(response => {
        this.computers = response;
        this.filledList = true;
      });
  }

  async updatePrintersList() {
    this.filledList = false;
    this.printers = undefined;
    await this.printerService.findAll()
      .toPromise().then(response => {
        this.printers = response;
        this.filledList = true;
      });
  }

  async updateNetworkDevicesList() {
    this.filledList = false;
    this.networkDevices = undefined;
    await this.networkDeviceService.findAll()
      .toPromise().then(response => {
        this.networkDevices = response;
        this.filledList = true;
      });
  }

  async updateMonitorsList() {
    this.filledList = false;
    this.monitors = undefined;
    await this.monitorService.findAll()
      .toPromise().then(response => {
        this.monitors = response;
        this.filledList = true;
      });
  }

  async createComputer(objetcNewDTO: ComputerNewDTO) {
    await this.loadingModalControllerService.loadingPresent('Salvando');
    if (objetcNewDTO.ipAddress === '') {
      objetcNewDTO.ipAddress = null;
    }
    if (objetcNewDTO.macAddress === '') {
      objetcNewDTO.macAddress = null;
    }
    this.computerService.create(objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Computador criado com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updateComputersList();
        this.redirectToRootPage();
      });
  }

  async createPrinter(objetcNewDTO: PrinterNewDTO) {
    await this.loadingModalControllerService.loadingPresent('Salvando');
    if (objetcNewDTO.ipAddress === '') {
      objetcNewDTO.ipAddress = null;
    }
    if (objetcNewDTO.macAddress === '') {
      objetcNewDTO.macAddress = null;
    }
    this.printerService.create(objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Impressora criada com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updatePrintersList();
        this.redirectToRootPage();
      });
  }

  async createNetworkDevice(objetcNewDTO: NetworkDeviceNewDTO) {
    await this.loadingModalControllerService.loadingPresent('Salvando');
    if (objetcNewDTO.ipAddress === '') {
      objetcNewDTO.ipAddress = null;
    }
    if (objetcNewDTO.macAddress === '') {
      objetcNewDTO.macAddress = null;
    }
    this.networkDeviceService.create(objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Dispositivo de rede criado com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updateNetworkDevicesList();
        this.redirectToRootPage();
      });
  }

  async createMonitor(objetcNewDTO: MonitorNewDTO) {
    await this.loadingModalControllerService.loadingPresent('Salvando');
    this.monitorService.create(objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Monitor criado com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updateMonitorsList();
        this.redirectToRootPage();
      });
  }

  async updateComputer(id: string, objetcNewDTO: ComputerNewDTO) {
    await this.loadingModalControllerService.loadingPresent('Salvando');
    if (objetcNewDTO.ipAddress === '') {
      objetcNewDTO.ipAddress = null;
    }
    if (objetcNewDTO.macAddress === '') {
      objetcNewDTO.macAddress = null;
    }
    this.computerService.update(id, objetcNewDTO)
      .subscribe((res) => {
        this.toastMessageControllerService.successMessageAlert('Computador atualizado com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updateComputersList();
        this.redirectToRootPage();
      });
  }

  async updatePrinter(id: string, objetcNewDTO: PrinterNewDTO) {
    await this.loadingModalControllerService.loadingPresent('Salvando');
    if (objetcNewDTO.ipAddress === '') {
      objetcNewDTO.ipAddress = null;
    }
    if (objetcNewDTO.macAddress === '') {
      objetcNewDTO.macAddress = null;
    }
    this.printerService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Impressora atualizada com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updatePrintersList();
        this.redirectToRootPage();
      });
  }

  async updateNetworkDevice(id: string, objetcNewDTO: NetworkDeviceNewDTO) {
    await this.loadingModalControllerService.loadingPresent('Salvando');
    if (objetcNewDTO.ipAddress === '') {
      objetcNewDTO.ipAddress = null;
    }
    if (objetcNewDTO.macAddress === '') {
      objetcNewDTO.macAddress = null;
    }
    this.networkDeviceService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Dispositivo de rede atualizado com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updateNetworkDevicesList();
        this.redirectToRootPage();
      });
  }

  async updateMonitor(id: string, objetcNewDTO: MonitorNewDTO) {
    await this.loadingModalControllerService.loadingPresent('Salvando');
    this.monitorService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Monitor atualizado com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updateMonitorsList();
        this.redirectToRootPage();
      });
  }

  async deleteComputer(id: string) {
    await this.loadingModalControllerService.loadingPresent('Excluindo');
    this.computerService.delete(id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Computador excluído com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updateComputersList();
        this.redirectToRootPage();
      });
  }

  async deletePrinter(id: string) {
    await this.loadingModalControllerService.loadingPresent('Excluindo');
    this.printerService.delete(id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Impressora excluída com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updatePrintersList();
        this.redirectToRootPage();
      });
  }

  async deleteNetworkDevice(id: string) {
    await this.loadingModalControllerService.loadingPresent('Excluindo');
    this.networkDeviceService.delete(id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Dispositivo de rede excluído com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updateNetworkDevicesList();
        this.redirectToRootPage();
      });
  }

  async deleteMonitor(id: string) {
    await this.loadingModalControllerService.loadingPresent('Excluindo');
    this.monitorService.delete(id)
      .subscribe(res => {
        this.toastMessageControllerService.successMessageAlert('Monitor excluído com sucesso');
        this.loadingModalControllerService.loadingDismiss();
        this.updateMonitorsList();
        this.redirectToRootPage();
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
          if (this.searchType === 'DEFAULT') {
            this.searchComputer(dataReturned.data.searchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
          }
          else if (this.searchType === 'COMPUTER_PROCESSOR') {
            this.searchComputerProcessor(dataReturned.data.searchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
          }
          else if (this.searchType === 'COMPUTER_COMPUTER_USER') {
            this.searchComputerComputerUser(dataReturned.data.searchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
          }
          else if (this.searchType === 'COMPUTER_ONLINE') {
            this.searchComputerOnline(dataReturned.data.booleanSearchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
          }
          else if (this.searchType === 'COMPUTER_ON_THE_DOMAIN') {
            this.searchComputerOnTheDomain(dataReturned.data.booleanSearchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
          }
          else if (this.searchType === 'COMPUTER_PERSONAL_COMPUTER') {
            this.searchComputerPersonalComputer(dataReturned.data.booleanSearchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
          }
        }
        else if (this.equipmentType === 'Impressoras') {
          this.searchPrinter(dataReturned.data.searchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
        }
        else if (this.equipmentType === 'Dispositivos de rede') {
          this.searchNetworkDevice(dataReturned.data.searchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
        }
        else if (this.equipmentType === 'Monitores') {
          this.searchMonitor(dataReturned.data.searchTerm, dataReturned.data.asc ? 'ASC' : 'DESC', dataReturned.data.orderBy);
        }
      }
    });
    return await modal.present();
  }

}
