import { Component, OnInit } from '@angular/core';

import { EquipmentControllerService } from './shared';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.page.html',
  styleUrls: ['./equipments.page.scss'],
})
export class EquipmentsPage implements OnInit {
  equipmentTypes: string[] =[
    "Computadores",
    "Impressoras",
    "Dispositivos de rede",
    "Monitores",
  ];
  public filledList: boolean = false;

  constructor(
    public controller: EquipmentControllerService
  ) { }

  async ngOnInit() {
    await this.controller.updateComputersList();
    this.filledList = true;
  }

  updateAllLists() {
    this.controller.updateComputersList();
    this.controller.updatePrintersList();
    this.controller.updateNetworkDevicesList();
    this.controller.updateMonitorsList();
  }

  async onChangeEquipmentType(equipmentType) {
    this.filledList = false;
    if(equipmentType === "Computadores" && !this.controller.computers)
      await this.controller.updateComputersList(); 
    else if(equipmentType === "Impressoras" && !this.controller.printers)
      await this.controller.updatePrintersList(); 
    else if(equipmentType === "Dispositivos de rede" && !this.controller.networkDevices)
      await this.controller.updateNetworkDevicesList();
    else if(equipmentType === "Monitores" && !this.controller.monitors)
      await this.controller.updateMonitorsList(); 
    this.filledList = true;
  }
  
}
