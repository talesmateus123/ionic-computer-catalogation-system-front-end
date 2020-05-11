import { Component, OnInit } from '@angular/core';
import { EquipmentNewDTO, ComputerNewDTO, MonitorNewDTO } from '../shared';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {
  equipmentTypes: string[] =[
    "Computador",
    "Impressora",
    "Monitor",
  ];
  equipmentType: string = "Computador";

  object: EquipmentNewDTO;

  computer: ComputerNewDTO = {
    manufacturer: "",
    model: "",
    description: "",
    itWorks: true,
    patrimonyId: "",
    ipAddress: "",
    hostName: "",
    motherBoardName: "",
    hasCdBurner: true,
    cabinetModel: "",
    operatingSystem: 1,
    operatingSystemArchitecture: 1,
    onTheDomain: true,
    processorId: 1,
    sectorId: 1,
    ramMemoriesId: [],
    storageDevicesId: [],
    computerUsersId: []
  };

  monitor: MonitorNewDTO = {
    manufacturer: "",
    model: "",
    description: "",
    itWorks: true,
    patrimonyId: "",
    sectorId: null,
	  computerId: null
  };
  
  constructor() { }

  ngOnInit() {
    this.object = this.computer;
  }

}
