import { Component, OnInit } from '@angular/core';

import { ComputerDTO, MonitorDTO, EquipmentControllerService } from '../shared';
import { ProcessorDTO, ElectronicComponentControllerService, StorageDeviceDTO, RamMemoryDTO } from '../electronic-components/shared';
import { SectorControllerService } from '../../sectors';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {
  public equipmentType = "COMPUTER";

  // public detailForm: boolean = false;
  public ramMemoryQuantity: number = 0;
  public storageDeviceQuantity: number = 0;
  
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
	public formTotalRamMemory: number = 0;
	public formTotalStorageMemory: number = 0;
  public formProcessorId: number;
  public formMonitorId: number;
  public formComputerId: number;
  public formSectorId: number;
  public formRamMemoriesId: number[] = [];
  public formStorageDevicesId: number[] = [];
  public formComputerUsersId: number[] = [];

  // Ram memories attributes
  public ramMemory1_manufacturer: string;
	public ramMemory1_model: string;
	public ramMemory1_description: string;
	public ramMemory1_itWorks: boolean;
	public ramMemory1_sizeInGB: number;
	public ramMemory1_architecture: string;
	public ramMemory1_type: string;

  public ramMemory2_manufacturer: string;
	public ramMemory2_model: string;
	public ramMemory2_description: string;
	public ramMemory2_itWorks: boolean;
	public ramMemory2_sizeInGB: number;
	public ramMemory2_architecture: string;
	public ramMemory2_type: string;

  public ramMemory3_manufacturer: string;
	public ramMemory3_model: string;
	public ramMemory3_description: string;
	public ramMemory3_itWorks: boolean;
	public ramMemory3_sizeInGB: number;
	public ramMemory3_architecture: string;
	public ramMemory3_type: string;
	public ramMemory3_computerId: number;

  public ramMemory4_manufacturer: string;
	public ramMemory4_model: string;
	public ramMemory4_description: string;
	public ramMemory4_itWorks: boolean;
	public ramMemory4_sizeInGB: number;
	public ramMemory4_architecture: string;
	public ramMemory4_type: string;

  // Storage devices attributes
  public storageDevice1_manufacturer: string;
	public storageDevice1_model: string;
	public storageDevice1_description: string;
	public storageDevice1_itWorks: boolean;
	public storageDevice1_sizeInGB: number;
	public storageDevice1_architecture: string;
	public storageDevice1_type: string;
  
  public storageDevice2_manufacturer: string;
	public storageDevice2_model: string;
	public storageDevice2_description: string;
	public storageDevice2_itWorks: boolean;
	public storageDevice2_sizeInGB: number;
	public storageDevice2_architecture: string;
	public storageDevice2_type: string;
  
  public storageDevice3_manufacturer: string;
	public storageDevice3_model: string;
	public storageDevice3_description: string;
	public storageDevice3_itWorks: boolean;
	public storageDevice3_sizeInGB: number;
	public storageDevice3_architecture: string;
	public storageDevice3_type: string;
  
  public storageDevice4_manufacturer: string;
	public storageDevice4_model: string;
	public storageDevice4_description: string;
	public storageDevice4_itWorks: boolean;
	public storageDevice4_sizeInGB: number;
	public storageDevice4_architecture: string;
	public storageDevice4_type: string;

  public availableComputers: ComputerDTO[];
  public availableMonitors: MonitorDTO[];
  public availableProcessors: ProcessorDTO[];
  public availableRamMemories: RamMemoryDTO[];
  public availableStorageDevices: StorageDeviceDTO[];
  
  constructor(
    public controller: EquipmentControllerService,
    public sectorController: SectorControllerService,
    public electronicComponentControllerService: ElectronicComponentControllerService
  ) { }

  ngOnInit() {
    this.sectorController.updateSectorsList();
    this.populateAvailableProcessors();
    this.populateAvailableRamMemories();
    this.populateAvailableStorageDevices();
    this.populateAvailableAvailableComputers();
    this.populateAvailableAvailableMonitors();
  }

  public addRamMemory() {
    if(this.ramMemoryQuantity < 4)
    this.ramMemoryQuantity++;
  }

  public addStorageDevice() {
    if(this.storageDeviceQuantity < 4)
      this.storageDeviceQuantity++;
  }

  public deleteRamMemory() {
    if(this.ramMemoryQuantity > 0)
    this.ramMemoryQuantity--;
  }

  public deleteStorageDevice() {
    if(this.storageDeviceQuantity > 0)
      this.storageDeviceQuantity--;
  }

  private populateAvailableProcessors() {
    this.electronicComponentControllerService.getAvailableProcessors().subscribe(res => {
      this.availableProcessors = res;
    }, 
    error => {
    });
  }

  private populateAvailableRamMemories() {
    this.electronicComponentControllerService.getAvailableRamMemories().subscribe(res => {
      this.availableRamMemories = res;
    }, 
    error => {
    });
  }

  public addAvailableRamMemory(ramMemory: RamMemoryDTO) {

  }
  
  private populateAvailableStorageDevices() {
    this.electronicComponentControllerService.getAvailableStorageDevices().subscribe(res => {
      this.availableStorageDevices = res;
    }, 
    error => {
    });
  }

  private populateAvailableAvailableComputers() {
    this.controller.getAvailableComputers().subscribe(res => {
      this.availableComputers = res;
    }, 
    error => {
    });
  }

  private populateAvailableAvailableMonitors() {
    this.controller.getAvailableMonitors().subscribe(res => {
      this.availableMonitors = res;
    }, 
    error => {
    });
  }

  public create() {
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
          totalRamMemory: this.formTotalRamMemory,
          totalStorageMemory: this.formTotalStorageMemory,
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
