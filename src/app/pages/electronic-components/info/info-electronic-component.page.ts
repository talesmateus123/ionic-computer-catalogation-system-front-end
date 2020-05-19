import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ElectronicComponentControllerService } from '../shared';
import { ArchitectureType, RamMemoryArchitecture, StorageDeviceArchitecture, StorageDeviceType } from '../shared';

@Component({
  selector: 'app-info-electronic-component',
  templateUrl: './info-electronic-component.page.html',
  styleUrls: ['./info-electronic-component.page.scss'],
})
export class InfoElectronicComponentPage implements OnInit {
  id: string;
  electronicComponentType: string;
  editForm: boolean;

  electronicComponentTypes: string[] =[
    "Processador",
    "Memória RAM",
    "Dispositivo de armazenamento",
  ];
  keys = Object.keys;

  processorArchitectures = ArchitectureType;
  ramMemoryArchitectures = RamMemoryArchitecture;
  storageDeviceArchitectures = StorageDeviceArchitecture;
  storageDeviceTypes = StorageDeviceType;

  formManufacturer: string;
  formModel: string;
  formDescription: string;
  formItWorks: boolean;
  formSize: number;
  formProcessorName: string;
  formProcessorArchitecture: string;
  formRamMemoryArchitecture: string;
  formStorageDeviceArchitecture: string;
  formStorageDeviceType: string;
  // computerId: number;
  
  electronicComponent: any;

  constructor(
    public controller: ElectronicComponentControllerService,
    private route: ActivatedRoute) {  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.electronicComponent = this.controller.findElectronic(this.id).subscribe(
      res => {
        let response = res;
        this.electronicComponentType = response.equipmentType
        if(this.electronicComponentType === "PROCESSOR") {
          this.electronicComponentType = "Processador";
          this.electronicComponent = response;
        }
        else if(this.electronicComponentType === "RAM_MEMORY") {
          this.electronicComponentType = "Memória RAM";
          this.electronicComponent = response;
        }
        else if(this.electronicComponentType === "STORAGE_DEVICE") {
          this.electronicComponentType = "Dispositivo de armazenamento";
          this.electronicComponent = response;
        }
        this.populateForm();
      },
      error => {
        this.controller.errorMessageAlert(error);
        this.controller.redirectToRootPage();
      }
    );
    this.editForm = true;
  }

  setEditForm() {
    if (this.editForm)
      this.editForm = false;
    else
      this.editForm = true;
  }


  populateForm() {
    if(this.electronicComponentType === "Processador") {    
      this.formManufacturer = this.electronicComponent.manufacturer;
      this.formModel = this.electronicComponent.model;
      this.formDescription = this.electronicComponent.description;
      this.formItWorks = this.electronicComponent.itWorks;
      this.formProcessorName = this.electronicComponent.processorName;
      this.formProcessorArchitecture =  this.electronicComponent.architecture;
    }
    if(this.electronicComponentType === "Memória RAM"){
      this.formManufacturer = this.electronicComponent.manufacturer;
      this.formModel = this.electronicComponent.model;
      this.formDescription = this.electronicComponent.description;
      this.formItWorks = this.electronicComponent.itWorks;
      this.formSize = this.controller.convertToGB(this.electronicComponent.sizeInMB);
      this.formRamMemoryArchitecture = this.electronicComponent.architecture;
    }
    if(this.electronicComponentType === "Dispositivo de armazenamento"){
      this.formManufacturer = this.electronicComponent.manufacturer;
      this.formModel = this.electronicComponent.model;
      this.formDescription = this.electronicComponent.description;
      this.formItWorks = this.electronicComponent.itWorks;
      this.formSize = this.controller.convertToGB(this.electronicComponent.sizeInMB);
      this.formStorageDeviceArchitecture = this.electronicComponent.architecture;
      this.formStorageDeviceType = this.electronicComponent.type;
    }
  }

  update() {
    if(this.electronicComponentType === "Processador"){
      this.controller.updateProcessor(this.id,
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
      this.controller.updateRamMemory(this.id,
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
      this.controller.updateStorageDevice(this.id,
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

  delete() {
    if(this.electronicComponentType === "Processador"){
      this.controller.deleteProcessor(this.id);
    }
    if(this.electronicComponentType === "Memória RAM"){
      this.controller.deleteRamMemory(this.id);
    }
    if(this.electronicComponentType === "Dispositivo de armazenamento"){
      this.controller.deleteStorageDevice(this.id);
    }
  }
}
