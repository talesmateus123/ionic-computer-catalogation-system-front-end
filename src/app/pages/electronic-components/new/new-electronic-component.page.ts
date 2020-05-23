import { Component, OnInit } from '@angular/core';

import { ElectronicComponentControllerService } from '../shared';

@Component({
  selector: 'app-new-electronic-component',
  templateUrl: './new-electronic-component.page.html',
  styleUrls: ['./new-electronic-component.page.scss'],
})
export class NewElectronicComponentPage implements OnInit {

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
    public controller: ElectronicComponentControllerService) { }

  ngOnInit() {
  }

  create() {
    if(this.controller.electronicComponentType === "Processador"){
      this.controller.createProcessor(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
	        processorName: this.formProcessorNumber,
          architecture: this.formProcessorArchitecture,
          computerId: null
        }
      );
    }
    if(this.controller.electronicComponentType === "Memória RAM"){
      this.controller.createRamMemory(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
          sizeInMB: this.controller.convertToMB(this.formSize),
          architecture: this.formRamMemoryArchitecture,
          computerId: null
        }
      );
    }
    if(this.controller.electronicComponentType === "Dispositivo de armazenamento"){
      this.controller.createStorageDevice(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
          sizeInMB: this.controller.convertToMB(this.formSize),
          architecture: this.formStorageDeviceArchitecture,
          type: this.formStorageDeviceType,
          computerId: null
        }
      );
    }
  }
}
