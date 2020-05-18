import { Component, OnInit } from '@angular/core';
import { ElectronicComponentControllerService } from '../shared';

export enum RamMemoryArchitecture {
  DDR1 = "DDR-1",
  DDR2 = "DDR-2",
  DDR3 = "DDR-3",
  DDR4 = "DDR-4",
}

export enum StorageDeviceArchitecture {
	SATA = "SATA",
	IDE = "IDE"
}

@Component({
  selector: 'app-new-electronic-component',
  templateUrl: './new-electronic-component.page.html',
  styleUrls: ['./new-electronic-component.page.scss'],
})
export class NewElectronicComponentPage implements OnInit {
  electronicComponentTypes: string[] =[
    "Processador",
    "Memória RAM",
    "Dispositivo de armazenamento",
  ];
  electronicComponentType = "Processador";

  keys = Object.keys;
  ramMemoryArchitectures = RamMemoryArchitecture;
  storageDeviceArchitectures = RamMemoryArchitecture;

  formManufacturer: string;
  formModel: string;
  formDescription: string;
  formItWorks: boolean = true;
  formSizeInMB: number;
	formProcessorName: string;
  formRamMemoryArchitecture: string = "DDR3";
  formStorageDeviceArchitecture: string = "SATA";
	// computerId: number;

  constructor(public controller: ElectronicComponentControllerService) { }

  ngOnInit() {
  }

  create() {
    if(this.electronicComponentType === "Processador"){
      this.controller.createProcessor(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
	        processorName: this.formProcessorName,
          architecture: this.formRamMemoryArchitecture,
          computerId: null
        }
      );
    }
    if(this.electronicComponentType === "Memória RAM"){
      this.controller.createRamMemory(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
          sizeInMB: this.formSizeInMB,
          architecture: this.formStorageDeviceArchitecture,
          computerId: null
        }
      );
    }
    if(this.electronicComponentType === "Dispositivo de armazenamento"){
      this.controller.createProcessor(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
	        processorName: this.formProcessorName,
          architecture: this.formRamMemoryArchitecture,
          computerId: null
        }
      );
    }
  }
}
