import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ComputerDTO, MonitorDTO, EquipmentControllerService } from '../shared';
import { ProcessorDTO } from '../../electronic-components/shared';
import { SectorControllerService } from '../../sectors';

@Component({
  selector: 'app-info-equipment',
  templateUrl: './info-equipment.page.html',
  styleUrls: ['./info-equipment.page.scss'],
})
export class InfoEquipmentPage implements OnInit {
  public equipmentType: string;

  private id: string;
  public editForm: boolean

  public formManufacturer: string;
  public formModel: string;
  public formDescription: string;
  public formItWorks: boolean
  public formPatrimonyId: string;
  public formIpAddress: string;
  public formHostName: string;
  public formMotherBoardName: string;
  public formHasCdBurner: boolean;
  public formCabinetModel: string;
  public formOperatingSystem: string;
  public formOperatingSystemArchitecture: string;
  public formOnTheDomain: boolean;
  public formProcessorId: number;
  public formMonitorId: number;
  public formSectorId: number;
  public formRamMemoriesId: number[];
  public formStorageDevicesId: number[];
  public formComputerUsersId: number[];

  public availableComputers: ComputerDTO[];
  public availableMonitors: MonitorDTO[];
  public availableProcessors: ProcessorDTO[];

  private equipment: any;

  constructor(
    public controller: EquipmentControllerService,
    public sectorController: SectorControllerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.sectorController.updateSectorsList();
    this.controller.findEquipment(this.id).subscribe(
      res => {
        let response = res;
        this.equipmentType = response.equipmentType
        if(this.equipmentType === "COMPUTER") {
          this.equipment = response;
          this.populateAvailableAvailableMonitors();
        }
        else if(this.equipmentType === "PRINTER") {
          this.equipment = response;
        }
        else if(this.equipmentType === "MONITOR") {
          this.equipment = response;
          this.populateAvailableAvailableComputers();
        }
        this.populateForm();
      },
      error => {
        this.controller.errorMessageAlert(error);
        this.controller.redirectToRootPage();
      }
    );
    this.editForm = true;
  }

  setEditForm() {
    if (this.editForm)
      this.editForm = false;
    else
      this.editForm = true;
  }

  populateAvailableAvailableComputers() {
    this.controller.getAvailableComputers().subscribe(res => {
      this.availableComputers = res;
      if (this.equipment.monitor !== null) {
        this.availableComputers.push(this.equipment.computer);
      }
    }, 
    error => {
    });
  }

  populateAvailableAvailableMonitors() {
    this.controller.getAvailableMonitors().subscribe(res => {
      this.availableMonitors = res;
      if (this.equipment.monitor !== null) {
        this.availableMonitors.push(this.equipment.monitor);
      }
    }, 
    error => {
    });
  }

  populateForm() {
    if(this.equipmentType === "COMPUTER") {
      this.formManufacturer = this.equipment.manufacturer;
      this.formModel = this.equipment.model;
      this.formDescription = this.equipment.description;
      this.formItWorks = this.equipment.itWorks;
      this.formPatrimonyId = this.equipment.patrimonyId;
      this.formIpAddress = this.equipment.ipAddress;
      this.formHostName = this.equipment.hostName;
      this.formMotherBoardName = this.equipment.motherBoardName;
      this.formHasCdBurner = this.equipment.hasCdBurner;
      this.formCabinetModel = this.equipment.cabinetModel;
      this.formOperatingSystem = this.equipment.operatingSystem;
      this.formOperatingSystemArchitecture = this.equipment.operatingSystemArchitecture;
      this.formOnTheDomain = this.equipment.onTheDomain;
      if (this.equipment.processor !== null)
        this.formProcessorId = this.equipment.processor.id;
      if (this.equipment.monitor !== null)   
        this.formMonitorId = this.equipment.monitor.id;
      this.formSectorId = this.equipment.sector.id;
      /*
      this.formRamMemoriesId = number[];
      this.formStorageDevicesId = number[];
      this.formComputerUsersId = number[];
      */
    }
    else if(this.equipmentType === "PRINTER") {
      this.formManufacturer = this.equipment.manufacturer;
      this.formModel = this.equipment.model;
      this.formDescription = this.equipment.description;
      this.formItWorks = this.equipment.itWorks;
      this.formPatrimonyId = this.equipment.patrimonyId;
      this.formIpAddress = this.equipment.ipAddress;
      this.formHostName = this.equipment.hostName;
      this.formSectorId = this.equipment.sector.id;
    }
    else if(this.equipmentType === "MONITOR") {    
      this.formManufacturer = this.equipment.manufacturer;
      this.formModel = this.equipment.model;
      this.formDescription = this.equipment.description;
      this.formItWorks = this.equipment.itWorks;
      this.formPatrimonyId = this.equipment.patrimonyId;
      // this.formComputerId = this.monitor.computer;
      this.formSectorId = this.equipment.sector.id;
    }
  }

  update() {    
    if(this.equipmentType === "COMPUTER") {
      this.controller.updateComputer(this.id, 
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
    else if(this.equipmentType === "PRINTER") {
      this.controller.updatePrinter(this.id, 
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
      this.controller.updateMonitor(this.id, 
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

  delete() {
    if(this.equipmentType === "COMPUTER")
      this.controller.deleteComputer(this.id);
    else if(this.equipmentType === "PRINTER") 
      this.controller.deletePrinter(this.id);
    else if(this.equipmentType === "MONITOR")   
      this.controller.deleteMonitor(this.id);
  }
}
