import { Component, OnInit } from '@angular/core';
import { ElectronicComponentControllerService } from './shared';

@Component({
  selector: 'app-electronic-components',
  templateUrl: './electronic-components.page.html',
  styleUrls: ['./electronic-components.page.scss'],
})
export class ElectronicComponentsPage implements OnInit {  
  electronicComponentTypes: string[] =[
    "Processadores",
    "Memórias RAM",
    "Dispositivos de armazenamento",
  ];
  electronicComponentType = "Processadores";

  constructor(public controller: ElectronicComponentControllerService) { }

  ngOnInit() {
    this.controller.updateProcessorsList();
    this.controller.updateRamMemoriesList();
    this.controller.updateStorageDevicesList();
  }

}
