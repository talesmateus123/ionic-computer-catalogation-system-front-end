import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ArchitectureType, RamMemoryArchitecture, StorageDeviceArchitecture, StorageDeviceType } from '../shared/models/enums';

@Component({
  selector: 'app-info-electronic-component-modal',
  templateUrl: './info-electronic-component-modal.page.html',
  styleUrls: ['./info-electronic-component-modal.page.scss'],
})
export class InfoElectronicComponentModalPage implements OnInit {
  
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

  public electronicComponentType: string;;
  public editForm: boolean;

  public formId: string;
  public formManufacturer: string;
  public formModel: string;
  public formDescription: string;
  public formItWorks: boolean = true;
  public formSize: number = 0;
  public formProcessorNumber: string;
  public formProcessorArchitecture: string = "AMD64";
  public formRamMemoryArchitecture: string = "DDR3";
  public formStorageDeviceArchitecture: string = "SATA";
  public formStorageDeviceType: string = "HD";
  
  constructor(
    private modalController: ModalController,
    ) { }

  ngOnInit() {
  }

  returnDataAndDismiss() {
    this.modalController.dismiss(
      {
        electronicComponentType: this.electronicComponentType,
        id: this.formId,
        manufacturer: this.formManufacturer,
        model: this.formModel,
        description: this.formDescription,
        itWorks: this.formItWorks,
        sizeInGB: this.formSize,
        processorName: this.formProcessorNumber,
        architecture: this.formProcessorArchitecture,
        type: this.formStorageDeviceType
      }
     );
  }

  dismiss() {
    this.modalController.dismiss();
  }  

  delete() {
    /*
    if(this.electronicComponentType === "PROCESSOR"){
      this.controller.deleteProcessor(this.id);
    }
    if(this.electronicComponentType === "RAM_MEMORY"){
      this.controller.deleteRamMemory(this.id);
    }
    if(this.electronicComponentType === "STORAGE_DEVICE"){
      this.controller.deleteStorageDevice(this.id);
    }
    */
  }
}
