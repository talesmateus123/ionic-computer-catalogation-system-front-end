import { Component, OnInit } from '@angular/core';
import { ElectronicComponentControllerService } from '../shared';
import { ArchitectureType, RamMemoryArchitecture, StorageDeviceArchitecture, StorageDeviceType } from '../shared';

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
  processorArchitectures = ArchitectureType;
  ramMemoryArchitectures = RamMemoryArchitecture;
  storageDeviceArchitectures = StorageDeviceArchitecture;
  storageDeviceTypes = StorageDeviceType;

  formManufacturer: string;
  formModel: string;
  formDescription: string;
  formItWorks: boolean = true;
  formSize: number = 0;
  formProcessorName: string;
  formProcessorArchitecture: string = "AMD64";
  formRamMemoryArchitecture: string = "DDR3";
  formStorageDeviceArchitecture: string = "SATA";
  formStorageDeviceType: string = "HD";
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
          architecture: this.formProcessorArchitecture,
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
          sizeInMB: this.controller.convertToMB(this.formSize),
          architecture: this.formRamMemoryArchitecture,
          computerId: null
        }
      );
    }
    if(this.electronicComponentType === "Dispositivo de armazenamento"){
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
