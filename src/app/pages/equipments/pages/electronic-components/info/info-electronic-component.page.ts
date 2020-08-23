import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ElectronicComponentControllerService } from '../shared';

@Component({
  selector: 'app-info-electronic-component',
  templateUrl: './info-electronic-component.page.html',
  styleUrls: ['./info-electronic-component.page.scss'],
})
export class InfoElectronicComponentPage implements OnInit {
  private id: string;
  public electronicComponentType: string;
  public editForm: boolean = true;
  public electronicComponent: any;

  constructor(
    public controller: ElectronicComponentControllerService,
    private route: ActivatedRoute) {  }

  ngOnInit() {
    this.initValues();
  }

  async initValues() {
    await this.controller.loadingPresent();
    this.id = this.route.snapshot.paramMap.get('id');
    this.electronicComponent = this.controller.findElectronic(this.id).subscribe(
      res => {
        let response = res;
        this.electronicComponentType = response.equipmentType;
        this.electronicComponent = response;
        this.controller.loadingDismiss();
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

  update() {
    if(this.electronicComponentType === "PROCESSOR"){
      this.controller.updateProcessor(this.id,
        {
          manufacturer: this.electronicComponent.manufacturer,
          model: this.electronicComponent.model,
          description: this.electronicComponent.description,
	        processorName: this.electronicComponent.processorName,
          architecture: this.electronicComponent.architecture,
          computerId: null
        }
      );
    }
    if(this.electronicComponentType === "RAM_MEMORY"){
      this.controller.updateRamMemory(this.id,
        {
          manufacturer: this.electronicComponent.manufacturer,
          model: this.electronicComponent.model,
          description: this.electronicComponent.description,
          sizeInGB: this.electronicComponent.sizeInGB,
          architecture: this.electronicComponent.architecture,
          computerId: null
        }
      );
    }
    if(this.electronicComponentType === "STORAGE_DEVICE"){
      this.controller.updateStorageDevice(this.id,
        {
          manufacturer: this.electronicComponent.manufacturer,
          model: this.electronicComponent.model,
          description: this.electronicComponent.description,
          sizeInGB: this.electronicComponent.sizeInGB,
          architecture: this.electronicComponent.architecture,
          type: this.electronicComponent.type,
          computerId: null
        }
      );
    }
  }

  delete() {
    if(this.electronicComponentType === "PROCESSOR"){
      this.controller.deleteProcessor(this.id);
    }
    if(this.electronicComponentType === "RAM_MEMORY"){
      this.controller.deleteRamMemory(this.id);
    }
    if(this.electronicComponentType === "STORAGE_DEVICE"){
      this.controller.deleteStorageDevice(this.id);
    }
  }
}
