import { Component, OnInit } from '@angular/core';

import { EquipmentDTO, ComputerDTO, PrinterDTO, MonitorDTO } from './shared';
import { ComputerService, MonitorService, PrinterService } from './shared';

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

  computers: ComputerDTO[];
  printers: PrinterDTO[];
  monitors: MonitorDTO[];

  constructor(
    private computerService: ComputerService,
    private monitorService: MonitorService,
    private printerService: PrinterService
  ) { }

  ngOnInit() {
    this.populateComputersList();
    this.populatePrintersList();
    this.populateMonitorsList();
  }

  populateComputersList() {
    this.computerService.findAll()
    .subscribe(response => {
      this.computers = response;
    },
    error => {
      console.log(error);
    });
  }

  populatePrintersList() {
    this.printerService.findAll()
    .subscribe(response => {
      this.printers = response;
    },
    error => {
      console.log(error);
    });
  }

  populateMonitorsList() {
    this.monitorService.findAll()
    .subscribe(response => {
      this.monitors = response;
    },
    error => {
      console.log(error);
    });
  }
}
