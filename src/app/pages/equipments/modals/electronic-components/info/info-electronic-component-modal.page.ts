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

  public electronicComponent: any;

  formManufacturer: string;
  formModel: string;
  formDescription: string;
  formProcessorName: string;
  formArchitecture: string
  formSizeInGB: number;
  formType: string;
  
  constructor(
    private modalController: ModalController,
    ) { }

  ngOnInit() {
    this.formManufacturer = this.electronicComponent.manufacturer
    this.formModel = this.electronicComponent.model;
    this.formDescription = this.electronicComponent.description;
    this.formProcessorName = this.electronicComponent.processorName;
    this.formArchitecture = this.electronicComponent.architecture;
    this.formSizeInGB = this.electronicComponent.sizeInGB;
    this.formType = this.electronicComponent.type;
  }

  returnDataAndDismiss() {
    this.electronicComponent.manufacturer = this.formManufacturer;
    this.electronicComponent.model = this.formModel;
    this.electronicComponent.description = this.formDescription;
    this.electronicComponent.processorName = this.formProcessorName;
    this.electronicComponent.architecture = this.formArchitecture;
    this.electronicComponent.sizeInGB = this.formSizeInGB;
    this.electronicComponent.type = this.formType;

    this.modalController.dismiss(
      {
        electronicComponent: this.electronicComponent
      }
     );
  }

  dismiss() {
    this.modalController.dismiss();
  }  

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.returnDataAndDismiss();
  }
  
}
