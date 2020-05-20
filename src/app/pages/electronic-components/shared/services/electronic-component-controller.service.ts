import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ElectronicService } from '../../../shared_resources';
import { RamMemoryService } from './ram-memory.service';
import { StorageDeviceService } from './storage-device.service';
import { RamMemoryDTO } from 'src/app/pages/electronic-components/shared/';
import { StorageDeviceDTO } from 'src/app/pages/electronic-components/shared/';
import { ProcessorService } from './processor.service';
import { ProcessorDTO, ProcessorNewDTO, RamMemoryNewDTO, StorageDeviceNewDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ElectronicComponentControllerService {
  public processors: ProcessorDTO[];
  public ramMemories: RamMemoryDTO[];
  public storageDevices: StorageDeviceDTO[];

  constructor(
    public alertController: AlertController,
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
        console.log(error);
      });
  }

  updateRamMemoriesList(): void {
    this.ramMemoryService.findAll().subscribe(
      response => {
        this.ramMemories = response;
      },
      error => {
        console.log(error);
      });
  }

  updateStorageDevicesList(): void {
    this.storageDeviceService.findAll().subscribe(
      response => {
        this.storageDevices = response;
      },
      error => {
        console.log(error);
      });
  }

  // create update delete
  createProcessor(objetcNewDTO: ProcessorNewDTO) {
    this.processorService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Processador criado com sucesso");
      this.updateProcessorsList();
      this.redirectToRootPage();
    }, 
    error => {
      console.log(error)
      this.errorMessageAlert(error);
    });
  }

  createRamMemory(objetcNewDTO: RamMemoryNewDTO) {
    console.log(objetcNewDTO)
    this.ramMemoryService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Memória RAM criada com sucesso");
      this.updateRamMemoriesList();
      this.redirectToRootPage();
    }, 
    error => {
      console.log(error)
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

  redirectToRootPage(): void {
    this.router.navigate(['electronic-components']);
  }

  convertToMB(sizeInGB: number): number {
    return sizeInGB * 1024;
  }

  convertToGB(sizeInMB: number): number {
    return sizeInMB / 1024;
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
