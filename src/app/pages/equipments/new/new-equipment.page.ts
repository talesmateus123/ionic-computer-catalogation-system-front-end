import { Component, OnInit } from '@angular/core';

import { ComputerDTO, MonitorDTO, EquipmentControllerService, ArchitectureType, OperatingSystem, } from '../shared';
import { ProcessorDTO } from '../../electronic-components/shared';
import { SectorDTO } from '../../sectors';

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
  equipmentType = "Computador";

  formManufacturer: string;
  formModel: string;
  formDescription: string;
  formItWorks: boolean = true;
  formPatrimonyId: string;
  formIpAddress: string;
  formHostName: string;
  formMotherBoardName: string;
  formHasCdBurner: boolean = true;
  formCabinetModel: string;
  formOperatingSystem: string = "NONE";
  formOperatingSystemArchitecture: string = "NONE";
  formOnTheDomain: boolean = false;
  formProcessorId: number;
  formMonitorId: number;
  formComputerId: number;
  formSectorId: number;
  formRamMemoriesId: number[];
  formStorageDevicesId: number[];
  formComputerUsersId: number[];

  sectors: SectorDTO[];
  computers: ComputerDTO[];
  monitors: MonitorDTO[];

  availableComputers: ComputerDTO[];
  availableMonitors: MonitorDTO[];
  availableProcessors: ProcessorDTO[];
  
  constructor(
    public controller: EquipmentControllerService,
  ) { }

  ngOnInit() {
    this.controller.updateSectorsList();
    this.populateAvailableAvailableComputers();
    this.populateAvailableAvailableMonitors();
  }

  populateAvailableAvailableComputers() {
    this.controller.getAvailableComputers().subscribe(res => {
      this.availableComputers = res;
    }, 
    error => {
    });
  }

  populateAvailableAvailableMonitors() {
    this.controller.getAvailableMonitors().subscribe(res => {
      this.availableMonitors = res;
    }, 
    error => {
    });
  }

  create() {
    if(this.equipmentType === "Computador"){
      this.controller.createComputer(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
          patrimonyId: this.formPatrimonyId,
          ipAddress: this.formIpAddress,
          hostName: this.formHostName,
          sectorId: this.formSectorId,      
          motherBoardName: this.formMotherBoardName,
          hasCdBurner: this.formHasCdBurner,
          cabinetModel: this.formCabinetModel,
          operatingSystem: this.formOperatingSystem,
          operatingSystemArchitecture: this.formOperatingSystemArchitecture,
          onTheDomain: this.formOnTheDomain,
          processorId: this.formProcessorId,
          monitorId: this.formMonitorId,
          ramMemoriesId: this.formRamMemoriesId,
          storageDevicesId: this.formStorageDevicesId,
          computerUsersId: this.formComputerUsersId
        }
      );
    }
    else if(this.equipmentType === "Impressora") {
      this.controller.createPrinter(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
          patrimonyId: this.formPatrimonyId,
          ipAddress: this.formIpAddress,
          hostName: this.formHostName,
          sectorId: this.formSectorId,          
        }
      );
    }
    else if(this.equipmentType === "Monitor") {
      this.controller.createMonitor(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
          patrimonyId: this.formPatrimonyId,
          sectorId: this.formSectorId,
          computerId: null
        }
      );
    }
  }
}
