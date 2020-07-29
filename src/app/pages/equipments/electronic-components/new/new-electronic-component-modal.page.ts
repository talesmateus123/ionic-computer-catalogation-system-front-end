import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-electronic-component-modal',
  templateUrl: './new-electronic-component-modal.page.html',
  styleUrls: ['./new-electronic-component-modal.page.scss'],
})
export class NewElectronicComponentModalPage implements OnInit {
  public electronicComponentType: string;
  formManufacturer: string;
  formModel: string;
  formDescription: string;
  formItWorks: boolean = true;
  formSize: number = 0;
  formProcessorNumber: string;
  formProcessorArchitecture: string = "AMD64";
  formRamMemoryArchitecture: string = "DDR3";
  formStorageDeviceArchitecture: string = "SATA";
  formStorageDeviceType: string = "HD";
	// computerId: number;
  
  constructor(
    private modalController: ModalController,
    ) { }

  ngOnInit() {
  }

  returnDataAndDismiss() {
    this.modalController.dismiss(
      {
        electronicComponentType: this.electronicComponentType,
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

}
