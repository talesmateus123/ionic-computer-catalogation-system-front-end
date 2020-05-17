import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { RamMemoryService } from './ram-memory.service';
import { StorageDeviceService } from './storage-device.service';
import { RamMemoryDTO } from 'src/app/pages/electronic-components/shared/models/ram_memory.dto';
import { StorageDeviceDTO } from 'src/app/pages/electronic-components/shared/models/storage_device.dto';
import { ProcessorService } from './processor.service';
import { ProcessorDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ElectronicComponentControllerService {
  public processors: ProcessorDTO[];
  public ramMemories: RamMemoryDTO[];
  public storageDevices: StorageDeviceDTO[];

  constructor(
    public alertController: AlertController,
    private processorService: ProcessorService,
    private ramMemoryService: RamMemoryService,
    private storageDeviceService: StorageDeviceService
  ) { }

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
