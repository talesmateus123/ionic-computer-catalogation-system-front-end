import { Component, OnInit } from '@angular/core';

import { ComputerDTO, MonitorDTO, EquipmentControllerService } from '../shared';
import { ProcessorDTO } from '../../electronic-components/shared';
import { SectorControllerService } from '../../sectors';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {
  public equipmentType = "COMPUTER";

  public detailForm: boolean = false;
  
  public formManufacturer: string;
  public formModel: string;
  public formDescription: string;
  public formItWorks: boolean = true;
  public formPatrimonyId: string;
  public formIpAddress: string;
  public formHostName: string;
  public formMotherBoardName: string;
  public formHasCdBurner: boolean = true;
  public formRamMemorySize: number = 0;
  public formStorageDeviceSize: number = 0;
  public formCabinetModel: string;
  public formOperatingSystem: string = "NONE";
  public formOperatingSystemArchitecture: string = "NONE";
  public formOnTheDomain: boolean = false;
  public formIsLaptop: boolean = false;
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
    public sectorController: SectorControllerService,
  ) { }

  ngOnInit() {
    this.sectorController.updateSectorsList();
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
    if(this.equipmentType === "COMPUTER"){
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
          isLaptop: this.formIsLaptop,
          processorId: this.formProcessorId,
          monitorId: this.formMonitorId,
          ramMemoriesId: this.formRamMemoriesId,
          storageDevicesId: this.formStorageDevicesId,
          computerUsersId: this.formComputerUsersId
        }
      );
    }
    else if(this.equipmentType === "PRINTER") {
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
    else if(this.equipmentType === "MONITOR") {
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
