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
  public editForm: boolean = true;
  public formSize: number;
  public electronicComponent: any;

  constructor(
    public controller: ElectronicComponentControllerService,
    private route: ActivatedRoute) {  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.electronicComponent = this.controller.findElectronic(this.id).subscribe(
      res => {
        let response = res;
        this.controller.electronicComponentType = response.equipmentType
        if(this.controller.electronicComponentType === "PROCESSOR") {
          this.controller.electronicComponentType = "Processador";
          this.electronicComponent = response;
        }
        else if(this.controller.electronicComponentType === "RAM_MEMORY") {
          this.controller.electronicComponentType = "Memória RAM";
          this.electronicComponent = response;
        }
        else if(this.controller.electronicComponentType === "STORAGE_DEVICE") {
          this.controller.electronicComponentType = "Dispositivo de armazenamento";
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
    if(this.controller.electronicComponentType === "Memória RAM"){
      this.formSize = this.controller.convertToGB(this.electronicComponent.sizeInMB);
    }
    if(this.controller.electronicComponentType === "Dispositivo de armazenamento"){
      this.formSize = this.controller.convertToGB(this.electronicComponent.sizeInMB);
    }
  }

  update() {
    if(this.controller.electronicComponentType === "Processador"){
      this.controller.updateProcessor(this.id,
        {
          manufacturer: this.electronicComponent.manufacturer,
          model: this.electronicComponent.model,
          description: this.electronicComponent.description,
          itWorks: this.electronicComponent.itWorks,
	        processorName: this.electronicComponent.processorName,
          architecture: this.electronicComponent.architecture,
          computerId: null
        }
      );
    }
    if(this.controller.electronicComponentType === "Memória RAM"){
      this.controller.updateRamMemory(this.id,
        {
          manufacturer: this.electronicComponent.manufacturer,
          model: this.electronicComponent.model,
          description: this.electronicComponent.description,
          itWorks: this.electronicComponent.itWorks,
          sizeInMB: this.controller.convertToMB(this.formSize),
          architecture: this.electronicComponent.architecture,
          computerId: null
        }
      );
    }
    if(this.controller.electronicComponentType === "Dispositivo de armazenamento"){
      this.controller.updateStorageDevice(this.id,
        {
          manufacturer: this.electronicComponent.manufacturer,
          model: this.electronicComponent.model,
          description: this.electronicComponent.description,
          itWorks: this.electronicComponent.itWorks,
          sizeInMB: this.controller.convertToMB(this.formSize),
          architecture: this.electronicComponent.architecture,
          type: this.electronicComponent.type,
          computerId: null
        }
      );
    }
  }

  delete() {
    if(this.controller.electronicComponentType === "Processador"){
      this.controller.deleteProcessor(this.id);
    }
    if(this.controller.electronicComponentType === "Memória RAM"){
      this.controller.deleteRamMemory(this.id);
    }
    if(this.controller.electronicComponentType === "Dispositivo de armazenamento"){
      this.controller.deleteStorageDevice(this.id);
    }
  }
}
