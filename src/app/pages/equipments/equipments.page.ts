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
    "Monitores",
  ];

  constructor(
    public controller: EquipmentControllerService
  ) { }

  ngOnInit() {
    this.updateAllLists();
  }

  updateAllLists() {
    this.controller.updateComputersList();
    this.controller.updatePrintersList();
    this.controller.updateMonitorsList();
  }
  
}
