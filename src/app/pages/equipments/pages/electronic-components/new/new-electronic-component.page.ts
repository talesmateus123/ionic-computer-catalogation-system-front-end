import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ElectronicComponentControllerService } from '../shared';

@Component({
  selector: 'app-new-electronic-component',
  templateUrl: './new-electronic-component.page.html',
  styleUrls: ['./new-electronic-component.page.scss'],
})
export class NewElectronicComponentPage implements OnInit {
  public electronicComponentType: string = "PROCESSOR";
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
    private route: ActivatedRoute,
    public controller: ElectronicComponentControllerService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.type !== undefined) {
          this.electronicComponentType = params.type;
        }
      });
    
  }

  create() {
    if(this.electronicComponentType === "PROCESSOR"){
      this.controller.createProcessor(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
	        processorName: this.formProcessorNumber,
          architecture: this.formProcessorArchitecture,
          computerId: null
        }
      );
    }
    if(this.electronicComponentType === "RAM_MEMORY"){
      this.controller.createRamMemory(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          sizeInGB: this.formSize,
          architecture: this.formRamMemoryArchitecture,
          computerId: null
        }
      );
    }
    if(this.electronicComponentType === "STORAGE_DEVICE"){
      this.controller.createStorageDevice(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          sizeInGB: this.formSize,
          architecture: this.formStorageDeviceArchitecture,
          type: this.formStorageDeviceType,
          computerId: null
        }
      );
    }
  }
}
