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
  public electronicComponentType: string;
  
  constructor(
    private modalController: ModalController,
    ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }  

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.dismiss();
  }
}
