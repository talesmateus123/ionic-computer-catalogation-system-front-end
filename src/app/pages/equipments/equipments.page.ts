import { Component, OnInit } from '@angular/core';

import { EquipmentDTO, ComputerDTO, PrinterDTO, MonitorDTO, PageService } from './shared';
import { ComputerService, MonitorService, PrinterService } from './shared';
import { Router } from '@angular/router';

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
  equipmentType = "Computadores";

  constructor(
    public pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.updateComputersList();
    this.pageService.updatePrintersList();
    this.pageService.updateMonitorsList();
  }
}
