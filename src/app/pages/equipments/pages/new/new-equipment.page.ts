import { Component, OnInit } from '@angular/core';

import { ComputerDTO, MonitorDTO, EquipmentControllerService } from '../../shared';
import { SectorControllerService } from '../../../sectors';
import { ModalController } from '@ionic/angular';
import { InfoElectronicComponentModalPage } from '../../modals/electronic-components';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {
  public equipmentType = "COMPUTER";

  public detailForm: boolean = false;
  public processorQuantity: number = 0;
  public ramMemoryQuantity: number = 0;
  public storageDeviceQuantity: number = 0;

  public ramMemories: any[] = [];
  public storageDevices: any[] = [];
  
  public formRamMemorySize: number = 0;
  public formStorageDeviceSize: number = 0;

  public formPatrimonyId: string;
	public formManufacturer: string;
	public formModel: string;
	public formDescription: string;
	public formIpAddress: string;
	public formMacAddress: string;
	public formHostName: string;
	public formMotherBoardName: string;
	public formHasCdBurner: boolean = true;
	public formCabinetModel: string;
	public formOperatingSystem: string = "NONE";
	public formOperatingSystemArchitecture: string = "NONE";
	public formComputerType: string = "DESKTOP";
	public formOnTheDomain: boolean = false;
	public formPersonalComputer: boolean = false;
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
    this.populateAvailableAvailableMonitors();
    if(this.controller.equipmentType === "Computadores") {
      this.equipmentType ="COMPUTER";
    }
    else if(this.controller.equipmentType === "Impressoras") {
      this.equipmentType = "PRINTER";
    }
    else if(this.controller.equipmentType === "Dispositivos de rede") {
      this.equipmentType = "NETWORK_DEVICE";
    }
    else if(this.controller.equipmentType === "Monitores") {
      this.equipmentType = "MONITOR";
    }
    /*
    this.populateAvailableProcessors();
    this.populateAvailableRamMemories();
    this.populateAvailableStorageDevices();
    */
    
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
    if(this.detailForm){
      this.formModel = undefined;
      this.formMotherBoardName = undefined;
      this.formCabinetModel = undefined;
      // Ram memories and storage devices is missing
    }

    if(this.equipmentType === "COMPUTER"){
      //this.controller.createComputer();
    }
    else if(this.equipmentType === "PRINTER") {
      this.controller.createPrinter(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
          patrimonyId: this.formPatrimonyId,
          ipAddress: this.formIpAddress,
          macAddress: this.formMacAddress,
          hostName: this.formHostName,
          sectorId: this.formSectorId,          
        }
      );
    }
    else if(this.equipmentType === "NETWORK_DEVICE") {
      this.controller.createNetworkDevice(
        {
          manufacturer: this.formManufacturer,
          model: this.formModel,
          description: this.formDescription,
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

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.create();
  }
}
