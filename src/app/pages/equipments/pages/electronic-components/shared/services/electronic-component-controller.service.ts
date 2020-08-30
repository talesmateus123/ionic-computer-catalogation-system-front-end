import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
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
    'PROCESSOR',
    'RAM_MEMORY',
    'STORAGE_DEVICE',
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
    private _LOCATION: Location,
    public loadingController: LoadingController,
    public toastController: ToastController,
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
    this.processorService.findAll()
      .subscribe(
        response => {
          this.processors = response;
        },
        error => {
          
        });
    }

  updateRamMemoriesList(): void {
    this.ramMemoryService.findAll()
      .subscribe(
        response => {
          this.ramMemories = response;
        },
        error => {
          
        });
  }

  updateStorageDevicesList(): void {
    this.storageDeviceService.findAll()
      .subscribe(
        response => {
          this.storageDevices = response;
        },
        error => {
          
        });
  }

  createProcessor(objetcNewDTO: ProcessorNewDTO): void {
    if(objetcNewDTO.processorName === '')
      objetcNewDTO.processorName = null;
    this.processorService.create(objetcNewDTO)
      .subscribe(res => {
        this.successMessageAlert('Processador criado com sucesso');
        this.updateProcessorsList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  createRamMemory(objetcNewDTO: RamMemoryNewDTO): void {
    this.ramMemoryService.create(objetcNewDTO)
      .subscribe(res => {
        this.successMessageAlert('Memória RAM criada com sucesso');
        this.updateRamMemoriesList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  createStorageDevice(objetcNewDTO: StorageDeviceNewDTO): void {
    this.storageDeviceService.create(objetcNewDTO)
      .subscribe(res => {
        this.successMessageAlert('Dispositivo de armazenamento criado com sucesso');
        this.updateStorageDevicesList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  updateProcessor(id: string, objetcNewDTO: ProcessorNewDTO): void {
    if(objetcNewDTO.processorName === '')
      objetcNewDTO.processorName = null;
    this.processorService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.successMessageAlert('Processador atualizado com sucesso');
        this.updateProcessorsList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  updateRamMemory(id: string, objetcNewDTO: RamMemoryNewDTO): void {
    this.ramMemoryService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.successMessageAlert('Memória RAM atualizada com sucesso');
        this.updateRamMemoriesList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  updateStorageDevice(id: string, objetcNewDTO: StorageDeviceNewDTO): void {
    this.storageDeviceService.update(id, objetcNewDTO)
      .subscribe(res => {
        this.successMessageAlert('Dispositivo de armazenamento atualizado com sucesso');
        this.updateStorageDevicesList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  deleteProcessor(id: string): void {
    this.processorService.delete(id)
      .subscribe(res => {
        this.successMessageAlert('Processador excluído com sucesso');
        this.updateProcessorsList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  deleteRamMemory(id: string): void {
    this.ramMemoryService.delete(id)
      .subscribe(res => {
        this.successMessageAlert('Memória RAM excluída com sucesso');
        this.updateRamMemoriesList();
        this.redirectToRootPage();
      },
      error => {
        
      });
  }

  deleteStorageDevice(id: string): void {
    this.storageDeviceService.delete(id)
      .subscribe(res => {
        this.successMessageAlert('Dispositivo de armazenamento excluído com sucesso');
        this.updateStorageDevicesList();
        this.redirectToRootPage();
      },
      error => {
        
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
    this._LOCATION.back();
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
      msg = 'Erro desconhecido';
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
