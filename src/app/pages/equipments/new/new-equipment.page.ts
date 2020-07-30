import { Component, OnInit } from '@angular/core';

import { ComputerDTO, MonitorDTO, EquipmentControllerService } from '../shared';
import { SectorControllerService } from '../../sectors';
import { ModalController } from '@ionic/angular';
import { InfoElectronicComponentModalPage } from '../electronic-components';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {
  public equipmentType = "COMPUTER";

  // public detailForm: boolean = false;
  public processorQuantity: number = 0;
  public ramMemoryQuantity: number = 0;
  public storageDeviceQuantity: number = 0;
  
  public formRamMemorySize: number = 0;
  public formStorageDeviceSize: number = 0;

  public formPatrimonyId: string;
	public formManufacturer: string;
	public formModel: string;
	public formDescription: string;
	public formItWorks: boolean = true;
	public formIpAddress: string;
	public formMacAddress: string;
	public formHostName: string;
	public formMotherBoardName: string;
	public formHasCdBurner: boolean = true;
	public formCabinetModel: string;
	public formOperatingSystem: string = "NONE";
	public formOperatingSystemArchitecture: string = "NONE";
	public formOnTheDomain: boolean = false;
	public formTotalRamMemory: number = 0;
	public formTotalStorageMemory: number = 0;
	public formMonitorId: number;
	public formSectorId: number;
	public formComputerUsersId: number[] = [];

  public availableComputers: ComputerDTO[];
  public availableMonitors: MonitorDTO[];

  public formProcessor_id: number;
	public formProcessor_manufacturer: string;
	public formProcessor_model: string;
	public formProcessor_description: string;
	public formProcessor_itWorks: boolean;
	public formProcessor_processorName: string;
	public formProcessor_architecture: string;

   // Ram memories attributes
	public formRamMemory1_id: number;
	public formRamMemory1_manufacturer: string;
	public formRamMemory1_model: string;
	public formRamMemory1_description: string;
	public formRamMemory1_itWorks: boolean;
	public formRamMemory1_sizeInGB: number;
	public formRamMemory1_architecture: string;

	public formRamMemory2_id: number;
	public formRamMemory2_manufacturer: string;
	public formRamMemory2_model: string;
	public formRamMemory2_description: string;
	public formRamMemory2_itWorks: boolean;
	public formRamMemory2_sizeInGB: number;
	public formRamMemory2_architecture: string;

	public formRamMemory3_id: number;
	public formRamMemory3_manufacturer: string;
	public formRamMemory3_model: string;
	public formRamMemory3_description: string;
	public formRamMemory3_itWorks: boolean;
	public formRamMemory3_sizeInGB: number;
	public formRamMemory3_architecture: string;

	public formRamMemory4_id: number;
	public formRamMemory4_manufacturer: string;
	public formRamMemory4_model: string;
	public formRamMemory4_description: string;
	public formRamMemory4_itWorks: boolean;
	public formRamMemory4_sizeInGB: number;
	public formRamMemory4_architecture: string;

	public formRamMemory5_id: number;
	public formRamMemory5_manufacturer: string;
	public formRamMemory5_model: string;
	public formRamMemory5_description: string;
	public formRamMemory5_itWorks: boolean;
	public formRamMemory5_sizeInGB: number;
	public formRamMemory5_architecture: string;

	public formRamMemory6_id: number;
	public formRamMemory6_manufacturer: string;
	public formRamMemory6_model: string;
	public formRamMemory6_description: string;
	public formRamMemory6_itWorks: boolean;
	public formRamMemory6_sizeInGB: number;
	public formRamMemory6_architecture: string;

	public formRamMemory7_id: number;
	public formRamMemory7_manufacturer: string;
	public formRamMemory7_model: string;
	public formRamMemory7_description: string;
	public formRamMemory7_itWorks: boolean;
	public formRamMemory7_sizeInGB: number;
	public formRamMemory7_architecture: string;

	public formRamMemory8_id: number;
	public formRamMemory8_manufacturer: string;
	public formRamMemory8_model: string;
	public formRamMemory8_description: string;
	public formRamMemory8_itWorks: boolean;
	public formRamMemory8_sizeInGB: number;
	public formRamMemory8_architecture: string;
	
  // Storage devices attributes
	public formStorageDevice1_id: number;
	public formStorageDevice1_manufacturer: string;
	public formStorageDevice1_model: string;
	public formStorageDevice1_description: string;
	public formStorageDevice1_itWorks: boolean;
	public formStorageDevice1_sizeInGB: number;
	public formStorageDevice1_architecture: string;
	public formStorageDevice1_type: string;

	public formStorageDevice2_id: number;
	public formStorageDevice2_manufacturer: string;
	public formStorageDevice2_model: string;
	public formStorageDevice2_description: string;
	public formStorageDevice2_itWorks: boolean;
	public formStorageDevice2_sizeInGB: number;
	public formStorageDevice2_architecture: string;
	public formStorageDevice2_type: string;
	
	public formStorageDevice3_id: number;
	public formStorageDevice3_manufacturer: string;
	public formStorageDevice3_model: string;
	public formStorageDevice3_description: string;
	public formStorageDevice3_itWorks: boolean;
	public formStorageDevice3_sizeInGB: number;
	public formStorageDevice3_architecture: string;
	public formStorageDevice3_type: string;

	public formStorageDevice4_id: number;
	public formStorageDevice4_manufacturer: string;
	public formStorageDevice4_model: string;
	public formStorageDevice4_description: string;
	public formStorageDevice4_itWorks: boolean;
	public formStorageDevice4_sizeInGB: number;
	public formStorageDevice4_architecture: string;
	public formStorageDevice4_type: string;	

	public formStorageDevice5_id: number;
	public formStorageDevice5_manufacturer: string;
	public formStorageDevice5_model: string;
	public formStorageDevice5_description: string;
	public formStorageDevice5_itWorks: boolean;
	public formStorageDevice5_sizeInGB: number;
	public formStorageDevice5_architecture: string;
	public formStorageDevice5_type: string;

	public formStorageDevice6_id: number;
	public formStorageDevice6_manufacturer: string;
	public formStorageDevice6_model: string;
	public formStorageDevice6_description: string;
	public formStorageDevice6_itWorks: boolean;
	public formStorageDevice6_sizeInGB: number;
	public formStorageDevice6_architecture: string;
	public formStorageDevice6_type: string;
	
	public formStorageDevice7_id: number;
	public formStorageDevice7_manufacturer: string;
	public formStorageDevice7_model: string;
	public formStorageDevice7_description: string;
	public formStorageDevice7_itWorks: boolean;
	public formStorageDevice7_sizeInGB: number;
	public formStorageDevice7_architecture: string;
	public formStorageDevice7_type: string;

	public formStorageDevice8_id: number;
	public formStorageDevice8_manufacturer: string;
	public formStorageDevice8_model: string;
	public formStorageDevice8_description: string;
	public formStorageDevice8_itWorks: boolean;
	public formStorageDevice8_sizeInGB: number;
	public formStorageDevice8_architecture: string;
	public formStorageDevice8_type: string;
  
  constructor(
    public controller: EquipmentControllerService,
    public sectorController: SectorControllerService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.sectorController.updateSectorsList();
    /*
    this.populateAvailableProcessors();
    this.populateAvailableRamMemories();
    this.populateAvailableStorageDevices();
    */
    this.populateAvailableAvailableMonitors();
  }

  public addProcessor() {
    if(this.processorQuantity < 1)
    this.processorQuantity++;
  }

  public addRamMemory() {
    if(this.ramMemoryQuantity < 8)
    this.ramMemoryQuantity++;
  }

  public addStorageDevice() {
    if(this.storageDeviceQuantity < 8)
      this.storageDeviceQuantity++;
  }

  public deleteProcessor() {
    if(this.processorQuantity > 0) {
      this.processorQuantity--;
      this.formProcessor_id = undefined;
      this.formProcessor_manufacturer = undefined;
      this.formProcessor_model = undefined;
      this.formProcessor_description = undefined;
      this.formProcessor_itWorks = undefined;
      this.formProcessor_processorName = undefined;
      this.formProcessor_architecture = undefined;
    }
  }

  public deleteRamMemory(number: number) {
    if(this.ramMemoryQuantity > 0)
      this.ramMemoryQuantity--;
  }

  public deleteStorageDevice(number: number) {
    if(this.storageDeviceQuantity > 0)
      this.storageDeviceQuantity--;
  }

  populateAvailableAvailableMonitors() {
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
          patrimonyId: this.formPatrimonyId,
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          itWorks: this.formItWorks,
          ipAddress: this.formIpAddress,
          macAddress: this.formMacAddress,
          hostName: this.formHostName,
          motherBoardName: this.formMotherBoardName,
          hasCdBurner: this.formHasCdBurner,
          cabinetModel: this.formCabinetModel,
          operatingSystem: this.formOperatingSystem,
          operatingSystemArchitecture: this.formOperatingSystemArchitecture,
          onTheDomain: this.formOnTheDomain,
          totalRamMemory: this.formTotalRamMemory,
          totalStorageMemory: this.formTotalStorageMemory,
          monitorId: this.formMonitorId,
          sectorId: this.formSectorId,
          computerUsersId: this.formComputerUsersId,
        
          processor_id: this.formProcessor_id,
          processor_manufacturer: this.formProcessor_manufacturer,
          processor_model: this.formProcessor_model,
          processor_description: this.formProcessor_description,
          processor_itWorks: this.formProcessor_itWorks,
          processor_processorName: this.formProcessor_processorName,
          processor_architecture: this.formProcessor_architecture,
        
          // Ram memories attributes
          ramMemory1_id: this.formRamMemory1_id,
          ramMemory1_manufacturer: this.formRamMemory1_manufacturer,
          ramMemory1_model: this.formRamMemory1_model,
          ramMemory1_description: this.formRamMemory1_description,
          ramMemory1_itWorks: this.formRamMemory1_itWorks,
          ramMemory1_sizeInGB: this.formRamMemory1_sizeInGB,
          ramMemory1_architecture: this.formRamMemory1_architecture,
        
          ramMemory2_id: this.formRamMemory2_id,
          ramMemory2_manufacturer: this.formRamMemory2_manufacturer,
          ramMemory2_model: this.formRamMemory2_model,
          ramMemory2_description: this.formRamMemory2_description,
          ramMemory2_itWorks: this.formRamMemory2_itWorks,
          ramMemory2_sizeInGB: this.formRamMemory2_sizeInGB,
          ramMemory2_architecture: this.formRamMemory2_architecture,
        
          ramMemory3_id: this.formRamMemory3_id,
          ramMemory3_manufacturer: this.formRamMemory3_manufacturer,
          ramMemory3_model: this.formRamMemory3_model,
          ramMemory3_description: this.formRamMemory3_description,
          ramMemory3_itWorks: this.formRamMemory3_itWorks,
          ramMemory3_sizeInGB: this.formRamMemory3_sizeInGB,
          ramMemory3_architecture: this.formRamMemory3_architecture,
        
          ramMemory4_id: this.formRamMemory4_id,
          ramMemory4_manufacturer: this.formRamMemory4_manufacturer,
          ramMemory4_model: this.formRamMemory4_model,
          ramMemory4_description: this.formRamMemory4_description,
          ramMemory4_itWorks: this.formRamMemory4_itWorks,
          ramMemory4_sizeInGB: this.formRamMemory4_sizeInGB,
          ramMemory4_architecture: this.formRamMemory4_architecture,
        
          ramMemory5_id: this.formRamMemory5_id,
          ramMemory5_manufacturer: this.formRamMemory5_manufacturer,
          ramMemory5_model: this.formRamMemory5_model,
          ramMemory5_description: this.formRamMemory5_description,
          ramMemory5_itWorks: this.formRamMemory5_itWorks,
          ramMemory5_sizeInGB: this.formRamMemory5_sizeInGB,
          ramMemory5_architecture: this.formRamMemory5_architecture,
        
          ramMemory6_id: this.formRamMemory6_id,
          ramMemory6_manufacturer: this.formRamMemory6_manufacturer,
          ramMemory6_model: this.formRamMemory6_model,
          ramMemory6_description: this.formRamMemory6_description,
          ramMemory6_itWorks: this.formRamMemory6_itWorks,
          ramMemory6_sizeInGB: this.formRamMemory6_sizeInGB,
          ramMemory6_architecture: this.formRamMemory6_architecture,
        
          ramMemory7_id: this.formRamMemory7_id,
          ramMemory7_manufacturer: this.formRamMemory7_manufacturer,
          ramMemory7_model: this.formRamMemory7_model,
          ramMemory7_description: this.formRamMemory7_description,
          ramMemory7_itWorks: this.formRamMemory7_itWorks,
          ramMemory7_sizeInGB: this.formRamMemory7_sizeInGB,
          ramMemory7_architecture: this.formRamMemory7_architecture,
        
          ramMemory8_id: this.formRamMemory8_id,
          ramMemory8_manufacturer: this.formRamMemory8_manufacturer,
          ramMemory8_model: this.formRamMemory8_model,
          ramMemory8_description: this.formRamMemory8_description,
          ramMemory8_itWorks: this.formRamMemory8_itWorks,
          ramMemory8_sizeInGB: this.formRamMemory8_sizeInGB,
          ramMemory8_architecture: this.formRamMemory8_architecture,

          storageDevice1_id: this.formStorageDevice1_id,
          storageDevice1_manufacturer: this.formStorageDevice1_manufacturer,
          storageDevice1_model: this.formStorageDevice1_model,
          storageDevice1_description: this.formStorageDevice1_description,
          storageDevice1_itWorks: this.formStorageDevice1_itWorks,
          storageDevice1_sizeInGB: this.formStorageDevice1_sizeInGB,
          storageDevice1_architecture: this.formStorageDevice1_architecture,
          storageDevice1_type: this.formStorageDevice1_type,

          storageDevice2_id: this.formStorageDevice2_id,
          storageDevice2_manufacturer: this.formStorageDevice2_manufacturer,
          storageDevice2_model: this.formStorageDevice2_model,
          storageDevice2_description: this.formStorageDevice2_description,
          storageDevice2_itWorks: this.formStorageDevice2_itWorks,
          storageDevice2_sizeInGB: this.formStorageDevice2_sizeInGB,
          storageDevice2_architecture: this.formStorageDevice2_architecture,
          storageDevice2_type: this.formStorageDevice2_type,
          
          storageDevice3_id: this.formStorageDevice3_id,
          storageDevice3_manufacturer: this.formStorageDevice3_manufacturer,
          storageDevice3_model: this.formStorageDevice3_model,
          storageDevice3_description: this.formStorageDevice3_description,
          storageDevice3_itWorks: this.formStorageDevice3_itWorks,
          storageDevice3_sizeInGB: this.formStorageDevice3_sizeInGB,
          storageDevice3_architecture: this.formStorageDevice3_architecture,
          storageDevice3_type: this.formStorageDevice3_type,

          storageDevice4_id: this.formStorageDevice4_id,
          storageDevice4_manufacturer: this.formStorageDevice4_manufacturer,
          storageDevice4_model: this.formStorageDevice4_model,
          storageDevice4_description: this.formStorageDevice4_description,
          storageDevice4_itWorks: this.formStorageDevice4_itWorks,
          storageDevice4_sizeInGB: this.formStorageDevice4_sizeInGB,
          storageDevice4_architecture: this.formStorageDevice4_architecture,
          storageDevice4_type: this.formStorageDevice4_type,

          storageDevice5_id: this.formStorageDevice5_id,
          storageDevice5_manufacturer: this.formStorageDevice5_manufacturer,
          storageDevice5_model: this.formStorageDevice5_model,
          storageDevice5_description: this.formStorageDevice5_description,
          storageDevice5_itWorks: this.formStorageDevice5_itWorks,
          storageDevice5_sizeInGB: this.formStorageDevice5_sizeInGB,
          storageDevice5_architecture: this.formStorageDevice5_architecture,
          storageDevice5_type: this.formStorageDevice5_type,

          storageDevice6_id: this.formStorageDevice6_id,
          storageDevice6_manufacturer: this.formStorageDevice6_manufacturer,
          storageDevice6_model: this.formStorageDevice6_model,
          storageDevice6_description: this.formStorageDevice6_model,
          storageDevice6_itWorks: this.formStorageDevice6_itWorks,
          storageDevice6_sizeInGB: this.formStorageDevice6_sizeInGB,
          storageDevice6_architecture: this.formStorageDevice6_architecture,
          storageDevice6_type: this.formStorageDevice6_type,
          
          storageDevice7_id: this.formStorageDevice7_id,
          storageDevice7_manufacturer: this.formStorageDevice7_manufacturer,
          storageDevice7_model: this.formStorageDevice7_model,
          storageDevice7_description: this.formStorageDevice7_description,
          storageDevice7_itWorks: this.formStorageDevice7_itWorks,
          storageDevice7_sizeInGB: this.formStorageDevice7_sizeInGB,
          storageDevice7_architecture: this.formStorageDevice7_architecture,
          storageDevice7_type: this.formStorageDevice7_type,

          storageDevice8_id: this.formStorageDevice8_id,
          storageDevice8_manufacturer: this.formStorageDevice8_manufacturer,
          storageDevice8_model: this.formStorageDevice8_model,
          storageDevice8_description: this.formStorageDevice8_description,
          storageDevice8_itWorks: this.formStorageDevice8_itWorks,
          storageDevice8_sizeInGB: this.formStorageDevice8_sizeInGB,
          storageDevice8_architecture: this.formStorageDevice8_architecture,
          storageDevice8_type: this.formStorageDevice8_type
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
          macAddress: this.formMacAddress,
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

  async electronicComponentModalPresent(electronicComponentType: string) {
    const modal = await this.modalController.create({
      component: InfoElectronicComponentModalPage,
      componentProps: {
        electronicComponentType: electronicComponentType,
        editForm: false
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        if(dataReturned.data.electronicComponentType === "PROCESSOR") {
          this.formProcessor_id = dataReturned.data.id;
          this.formProcessor_manufacturer = dataReturned.data.manufacturer;
          this.formProcessor_model = dataReturned.data.model;
          this.formProcessor_description = dataReturned.data.description;
          this.formProcessor_itWorks = dataReturned.data.itWorks;
          this.formProcessor_processorName = dataReturned.data.processorName;
          this.formProcessor_architecture = dataReturned.data.architecture;
        }
        else if(dataReturned.data.electronicComponentType === "RAM_MEMORY") {
          this.formProcessor_id = dataReturned.data.id;
          this.formProcessor_manufacturer = dataReturned.data.manufacturer;
          this.formProcessor_model = dataReturned.data.model;
          this.formProcessor_description = dataReturned.data.description;
          this.formProcessor_itWorks = dataReturned.data.itWorks;
          this.formProcessor_processorName = dataReturned.data.processorName;
          this.formProcessor_architecture = dataReturned.data.architecture;
        }
        else if(dataReturned.data.electronicComponentType === "STORAGE_DEVICE") {
          this.formProcessor_id = dataReturned.data.id;
          this.formProcessor_manufacturer = dataReturned.data.manufacturer;
          this.formProcessor_model = dataReturned.data.model;
          this.formProcessor_description = dataReturned.data.description;
          this.formProcessor_itWorks = dataReturned.data.itWorks;
          this.formProcessor_processorName = dataReturned.data.processorName;
          this.formProcessor_architecture = dataReturned.data.architecture;
        }
        console.log(dataReturned.data);
      }
    });
    return await modal.present();
  }
}
