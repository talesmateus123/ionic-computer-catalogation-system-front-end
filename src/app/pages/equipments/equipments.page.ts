import { Component, OnInit } from '@angular/core';
import { EquipmentDTO } from './shared';
import { ComputerService, MonitorService, PrinterService } from './shared';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.page.html',
  styleUrls: ['./equipments.page.scss'],
})
export class EquipmentsPage implements OnInit {
  items: EquipmentDTO[];
  equipmentTypes: string[] =[
    "Computador",
    "Impressora",
    "Monitor",
  ];
  equipmentType: string = "Computador";

  constructor(
    private computerService: ComputerService,
    private monitorService: MonitorService,
    private printerService: PrinterService
  ) { }

  ngOnInit() {
    if(this.equipmentType === "Computador") 
      this.populateComputersList();
  }

  populateComputersList() {
    this.computerService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {
      console.log(error);
    });
  }

}
