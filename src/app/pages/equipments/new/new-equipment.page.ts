import { Component, OnInit } from '@angular/core';

import { ComputerDTO, MonitorDTO, EquipmentControllerService, ArchitectureType, OperatingSystem, } from '../shared';
import { ProcessorDTO } from '../../electronic-components/shared';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {
  public equipmentType = "Computador";
  
  public formManufacturer: string;
  public formModel: string;
  public formDescription: string;
  public formItWorks: boolean = true;
  public formPatrimonyId: string;
  public formIpAddress: string;
  public formHostName: string;
  public formMotherBoardName: string;
  public formHasCdBurner: boolean = true;
  public formCabinetModel: string;
  public formOperatingSystem: string = "NONE";
  public formOperatingSystemArchitecture: string = "NONE";
  public formOnTheDomain: boolean = false;
  public formProcessorId: number;
  public formMonitorId: number;
  public formComputerId: number;
  public formSectorId: number;
  public formRamMemoriesId: number[];
  public formStorageDevicesId: number[];
  public formComputerUsersId: number[];

  public availableComputers: ComputerDTO[];
  public availableMonitors: MonitorDTO[];
  public availableProcessors: ProcessorDTO[];
  
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
