import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-electronic-component-modal',
  templateUrl: './info-electronic-component-modal.page.html',
  styleUrls: ['./info-electronic-component-modal.page.scss'],
})
export class InfoElectronicComponentModalPage implements OnInit {
  private id: string;
  public electronicComponentType: string;
  public editForm: boolean = true;
  public electronicComponent: any;

  constructor(
    private route: ActivatedRoute
    ) {  }

  ngOnInit() {
    this.editForm = true;
  }

  setEditForm() {
    if (this.editForm)
      this.editForm = false;
    else
      this.editForm = true;
  }

  update() {
    /*
    if(this.electronicComponentType === "PROCESSOR"){
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
    if(this.electronicComponentType === "RAM_MEMORY"){
      this.controller.updateRamMemory(this.id,
        {
          manufacturer: this.electronicComponent.manufacturer,
          model: this.electronicComponent.model,
          description: this.electronicComponent.description,
          itWorks: this.electronicComponent.itWorks,
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
          itWorks: this.electronicComponent.itWorks,
          sizeInGB: this.electronicComponent.sizeInGB,
          architecture: this.electronicComponent.architecture,
          type: this.electronicComponent.type,
          computerId: null
        }
      );
    }
    */
  }

  delete() {
    /*
    if(this.electronicComponentType === "PROCESSOR"){
      this.controller.deleteProcessor(this.id);
    }
    if(this.electronicComponentType === "RAM_MEMORY"){
      this.controller.deleteRamMemory(this.id);
    }
    if(this.electronicComponentType === "STORAGE_DEVICE"){
      this.controller.deleteStorageDevice(this.id);
    }
    */
  }
}
