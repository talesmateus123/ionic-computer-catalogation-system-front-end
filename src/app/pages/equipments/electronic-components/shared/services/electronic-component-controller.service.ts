import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { ProcessorService } from './processor.service';
import { RamMemoryService } from './ram-memory.service';
import { StorageDeviceService } from './storage-device.service';
import { 
  ProcessorDTO, RamMemoryDTO, StorageDeviceDTO, ProcessorNewDTO, 
  RamMemoryNewDTO, StorageDeviceNewDTO, ArchitectureType, 
  RamMemoryArchitecture, StorageDeviceArchitecture, StorageDeviceType } from '../models';
import { ElectronicService } from 'src/app/pages/shared-resources';

@Injectable({
  providedIn: 'root'
})
export class ElectronicComponentControllerService {
  public electronicComponentTypes: string[] =[
    "PROCESSOR",
    "RAM_MEMORY",
    "STORAGE_DEVICE",
  ];

  public keys = Object.keys;

  public processorArchitectures = ArchitectureType;
  public ramMemoryArchitectures = RamMemoryArchitecture;
  public storageDeviceArchitectures = StorageDeviceArchitecture;
  public storageDeviceTypes = StorageDeviceType;

  public processors: ProcessorDTO[];
  public ramMemories: RamMemoryDTO[];
  public storageDevices: StorageDeviceDTO[];

  constructor(
    private _location: Location,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router, 
    private electronicComponentService: ElectronicService,
    private processorService: ProcessorService,
    private ramMemoryService: RamMemoryService,
    private storageDeviceService: StorageDeviceService
  ) { }


  findElectronic(id: string): Observable<any> {
    return this.electronicComponentService.findById(id);
  }

  findSector(id: string): Observable<ProcessorDTO> {
    return this.processorService.findById(id);
  }

  updateProcessorsList(): void {
    this.processorService.findAll().subscribe(
      response => {
        this.processors = response;
      },
      error => {
        this.errorMessageAlert(error);
      });
  }

  updateRamMemoriesList(): void {
    this.ramMemoryService.findAll().subscribe(
      response => {
        this.ramMemories = response;
      },
      error => {
        this.errorMessageAlert(error);
      });
  }

  updateStorageDevicesList(): void {
    this.storageDeviceService.findAll().subscribe(
      response => {
        this.storageDevices = response;
      },
      error => {
        this.errorMessageAlert(error);
      });
  }

  createProcessor(objetcNewDTO: ProcessorNewDTO) {
    this.processorService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Processador criado com sucesso");
      this.updateProcessorsList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  createRamMemory(objetcNewDTO: RamMemoryNewDTO) {
    this.ramMemoryService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Memória RAM criada com sucesso");
      this.updateRamMemoriesList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  createStorageDevice(objetcNewDTO: StorageDeviceNewDTO) {
    this.storageDeviceService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Dispositivo de armazenamento criado com sucesso");
      this.updateStorageDevicesList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  updateProcessor(id: string, object: ProcessorNewDTO): void {
    this.processorService.update(id, object).subscribe(res => {
      this.successMessageAlert("Processador atualizado com sucesso");
      this.updateProcessorsList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  updateRamMemory(id: string, object: RamMemoryNewDTO): void {
    this.ramMemoryService.update(id, object).subscribe(res => {
      this.successMessageAlert("Memória RAM atualizada com sucesso");
      this.updateRamMemoriesList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  updateStorageDevice(id: string, object: StorageDeviceNewDTO): void {
    this.storageDeviceService.update(id, object).subscribe(res => {
      this.successMessageAlert("Dispositivo de armazenamento atualizado com sucesso");
      this.updateStorageDevicesList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  deleteProcessor(id: string): void {
    this.processorService.delete(id).subscribe(res => {
      this.successMessageAlert("Processador excluído com sucesso");
      this.updateProcessorsList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  deleteRamMemory(id: string): void {
    this.ramMemoryService.delete(id).subscribe(res => {
      this.successMessageAlert("Memória RAM excluída com sucesso");
      this.updateRamMemoriesList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  deleteStorageDevice(id: string): void {
    this.storageDeviceService.delete(id).subscribe(res => {
      this.successMessageAlert("Dispositivo de armazenamento excluído com sucesso");
      this.updateStorageDevicesList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  getAvailableProcessors(): Observable<ProcessorDTO[]> {
    return this.processorService.findAvailable();
  }

  getAvailableRamMemories(): Observable<RamMemoryDTO[]> {
    return this.ramMemoryService.findAvailable();
  }

  getAvailableStorageDevices(): Observable<StorageDeviceDTO[]> {
    return this.storageDeviceService.findAvailable();
  }

  redirectToRootPage(): void {
    this._location.back();
    //this.router.navigate(['electronic-components']);
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
