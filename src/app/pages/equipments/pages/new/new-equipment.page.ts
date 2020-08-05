import { Component, OnInit } from '@angular/core';

import { ComputerDTO, MonitorDTO, EquipmentControllerService, ComputerNewDTO } from '../../shared';
import { SectorControllerService } from '../../../sectors';
import { ModalController } from '@ionic/angular';
import { InfoElectronicComponentModalPage } from '../../modals/electronic-components';
import { ProcessorDTO, RamMemoryDTO, StorageDeviceDTO } from '../electronic-components';
import { ComputerUserDTO } from 'src/app/pages/computer-users';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {
  public detailForm: boolean = false;
  public editForm: boolean = false;

  public equipment: any;
  public equipmentType: string;

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

  public processors: ProcessorDTO[] = [];
  public ramMemories: RamMemoryDTO[] = [];
  public storageDevices: StorageDeviceDTO[] = [];
  public computerUsers: ComputerUserDTO[] = [];

  public availableMonitors: MonitorDTO[];
  
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
    if(this.processors.length < 1)
      this.processors.push({
        id: null,
        createdDate: null,
        lastModifiedDate: null,
        equipmentType: "PROCESSOR",
	      manufacturer: "",
	      model: "",
	      description: "",
	      processorName: "",
	      architecture: "AMD64"
      });
  }

  public addRamMemory() {
    if(this.ramMemories.length < 8)
      this.ramMemories.push({
        id: null,
        createdDate: null,
        lastModifiedDate: null,
        equipmentType: "RAM_MEMORY",
        manufacturer: "",
        model: "",
        description: "",
        sizeInGB: 0,
        architecture: "DDR3"
      });
  }

  public addStorageDevice() {
    if(this.storageDevices.length < 8)
      this.storageDevices.push({
        id: null,
        createdDate: null,
        lastModifiedDate: null,
        equipmentType: "STORAGE_DEVICE",
        manufacturer: "",
        model: "",
        description: "",
        sizeInGB: 0,
        architecture: "SATA",
        type: "HD"
      });
  }

  public addUser() {
    if(this.computerUsers.length < 5)
      this.computerUsers.push(undefined);
  }

  public deleteProcessor() {
    this.processors.splice(0, 1);
  }

  public deleteRamMemory(index: number) {
    this.ramMemories.splice(index, 1);
  }

  public deleteStorageDevice(index: number) {
    this.storageDevices.splice(index, 1);
  }

  public deleteUser(index: number) {
    this.computerUsers.splice(index, 1);
  }

  populateAvailableAvailableMonitors() {
    this.controller.getAvailableMonitors().subscribe(res => {
      this.availableMonitors = res;
    }, 
    error => {
    });
  }

  public create() {
    if(this.equipmentType === "COMPUTER") {
      if(!this.detailForm){
        this.formMotherBoardName = undefined;
        this.formCabinetModel = undefined;
        this.ramMemories = [];
        this.storageDevices = [];
      }

      let computerUsersId: string[] = [];
      for(let computerUser in this.computerUsers) {
       computerUsersId.push(this.computerUsers[computerUser].id);
      }
      let equipment: ComputerNewDTO = {
        patrimonyId: this.formPatrimonyId,
        manufacturer: this.formManufacturer,
        model: this.formModel,
        description: this.formDescription,
        ipAddress: this.formIpAddress,
        macAddress: this.formMacAddress,
        hostName: this.formHostName,
        motherBoardName: this.formMotherBoardName,
        hasCdBurner: this.formHasCdBurner,
        cabinetModel: this.formCabinetModel,
        operatingSystem: this.formOperatingSystem,
        operatingSystemArchitecture: this.formOperatingSystemArchitecture,
        computerType: this.formComputerType,
        onTheDomain: this.formOnTheDomain,
        personalComputer: this.formPersonalComputer,
        totalRamMemory: this.formTotalRamMemory,
        totalStorageMemory: this.formTotalStorageMemory,
        monitorId: this.formMonitorId,
        sectorId: this.formSectorId,
        computerUsersId: computerUsersId,
        processor_id: this.processors[0].id,
        processor_manufacturer: this.processors[0].manufacturer,
        processor_model: this.processors[0].model,
        processor_description: this.processors[0].description,
        processor_processorName: this.processors[0].processorName,
        processor_architecture: this.processors[0].architecture,
        
        ramMemory1_id: this.ramMemories[0] != undefined ? this.ramMemories[0].id : undefined,
        ramMemory1_manufacturer: this.ramMemories[0] != undefined ? this.ramMemories[0].manufacturer : undefined,
        ramMemory1_model: this.ramMemories[0] != undefined ? this.ramMemories[0].model : undefined,
        ramMemory1_description: this.ramMemories[0] != undefined ? this.ramMemories[0].description : undefined,
        ramMemory1_sizeInGB: this.ramMemories[0] != undefined ? this.ramMemories[0].sizeInGB : undefined,
        ramMemory1_architecture: this.ramMemories[0] != undefined ? this.ramMemories[0].architecture : undefined,

        ramMemory2_id: this.ramMemories[1] != undefined ? this.ramMemories[1].id : undefined,
        ramMemory2_manufacturer: this.ramMemories[1] != undefined ? this.ramMemories[1].manufacturer : undefined,
        ramMemory2_model: this.ramMemories[1] != undefined ? this.ramMemories[1].model : undefined,
        ramMemory2_description: this.ramMemories[1] != undefined ? this.ramMemories[1].description : undefined,
        ramMemory2_sizeInGB: this.ramMemories[1] != undefined ? this.ramMemories[1].sizeInGB : undefined,
        ramMemory2_architecture: this.ramMemories[1] != undefined ? this.ramMemories[1].architecture : undefined,

        ramMemory3_id: this.ramMemories[2] != undefined ? this.ramMemories[2].id : undefined,
        ramMemory3_manufacturer: this.ramMemories[2] != undefined ? this.ramMemories[2].manufacturer : undefined,
        ramMemory3_model: this.ramMemories[2] != undefined ? this.ramMemories[2].model : undefined,
        ramMemory3_description: this.ramMemories[2] != undefined ? this.ramMemories[2].description : undefined,
        ramMemory3_sizeInGB: this.ramMemories[2] != undefined ? this.ramMemories[2].sizeInGB : undefined,
        ramMemory3_architecture: this.ramMemories[2] != undefined ? this.ramMemories[2].architecture : undefined,
      
        ramMemory4_id: this.ramMemories[3] != undefined ? this.ramMemories[3].id : undefined,
        ramMemory4_manufacturer: this.ramMemories[3] != undefined ? this.ramMemories[3].manufacturer : undefined,
        ramMemory4_model: this.ramMemories[3] != undefined ? this.ramMemories[3].model : undefined,
        ramMemory4_description: this.ramMemories[3] != undefined ? this.ramMemories[3].description : undefined,
        ramMemory4_sizeInGB: this.ramMemories[3] != undefined ? this.ramMemories[3].sizeInGB : undefined,
        ramMemory4_architecture: this.ramMemories[3] != undefined ? this.ramMemories[3].architecture : undefined,

        ramMemory5_id: this.ramMemories[4] != undefined ? this.ramMemories[4].id : undefined,
        ramMemory5_manufacturer: this.ramMemories[4] != undefined ? this.ramMemories[4].manufacturer : undefined,
        ramMemory5_model: this.ramMemories[4] != undefined ? this.ramMemories[4].model : undefined,
        ramMemory5_description: this.ramMemories[4] != undefined ? this.ramMemories[4].description : undefined,
        ramMemory5_sizeInGB: this.ramMemories[4] != undefined ? this.ramMemories[4].sizeInGB : undefined,
        ramMemory5_architecture: this.ramMemories[4] != undefined ? this.ramMemories[4].architecture : undefined,

        ramMemory6_id: this.ramMemories[5] != undefined ? this.ramMemories[5].id : undefined,
        ramMemory6_manufacturer: this.ramMemories[5] != undefined ? this.ramMemories[5].manufacturer : undefined,
        ramMemory6_model: this.ramMemories[5] != undefined ? this.ramMemories[5].model : undefined,
        ramMemory6_description: this.ramMemories[5] != undefined ? this.ramMemories[5].description : undefined,
        ramMemory6_sizeInGB: this.ramMemories[5] != undefined ? this.ramMemories[5].sizeInGB : undefined,
        ramMemory6_architecture: this.ramMemories[5] != undefined ? this.ramMemories[5].architecture : undefined,

        ramMemory7_id: this.ramMemories[6] != undefined ? this.ramMemories[6].id : undefined,
        ramMemory7_manufacturer: this.ramMemories[6] != undefined ? this.ramMemories[6].manufacturer : undefined,
        ramMemory7_model: this.ramMemories[6] != undefined ? this.ramMemories[6].model : undefined,
        ramMemory7_description: this.ramMemories[6] != undefined ? this.ramMemories[6].description : undefined,
        ramMemory7_sizeInGB: this.ramMemories[6] != undefined ? this.ramMemories[6].sizeInGB : undefined,
        ramMemory7_architecture: this.ramMemories[6] != undefined ? this.ramMemories[6].architecture : undefined,

        ramMemory8_id: this.ramMemories[7] != undefined ? this.ramMemories[7].id : undefined,
        ramMemory8_manufacturer: this.ramMemories[7] != undefined ? this.ramMemories[7].manufacturer : undefined,
        ramMemory8_model: this.ramMemories[7] != undefined ? this.ramMemories[7].model : undefined,
        ramMemory8_description: this.ramMemories[7] != undefined ? this.ramMemories[7].description : undefined,
        ramMemory8_sizeInGB: this.ramMemories[7] != undefined ? this.ramMemories[7].sizeInGB : undefined,
        ramMemory8_architecture: this.ramMemories[7] != undefined ? this.ramMemories[7].architecture : undefined,

        storageDevice1_id: this.storageDevices[0] != undefined ? this.storageDevices[0].id : undefined,
        storageDevice1_manufacturer: this.storageDevices[0] != undefined ? this.storageDevices[0].manufacturer : undefined,
        storageDevice1_model: this.storageDevices[0] != undefined ? this.storageDevices[0].model : undefined,
        storageDevice1_description: this.storageDevices[0] != undefined ? this.storageDevices[0].description : undefined,
        storageDevice1_sizeInGB: this.storageDevices[0] != undefined ? this.storageDevices[0].sizeInGB : undefined,
        storageDevice1_architecture: this.storageDevices[0] != undefined ? this.storageDevices[0].architecture : undefined,
        storageDevice1_type: this.storageDevices[0] != undefined ? this.storageDevices[0].type : undefined,

        storageDevice2_id: this.storageDevices[1] != undefined ? this.storageDevices[1].id : undefined,
        storageDevice2_manufacturer: this.storageDevices[1] != undefined ? this.storageDevices[1].manufacturer : undefined,
        storageDevice2_model: this.storageDevices[1] != undefined ? this.storageDevices[1].model : undefined,
        storageDevice2_description: this.storageDevices[1] != undefined ? this.storageDevices[1].description : undefined,
        storageDevice2_sizeInGB: this.storageDevices[1] != undefined ? this.storageDevices[1].sizeInGB : undefined,
        storageDevice2_architecture: this.storageDevices[1] != undefined ? this.storageDevices[1].architecture : undefined,
        storageDevice2_type: this.storageDevices[1] != undefined ? this.storageDevices[1].type : undefined,
        
        storageDevice3_id: this.storageDevices[2] != undefined ? this.storageDevices[2].id : undefined,
        storageDevice3_manufacturer: this.storageDevices[2] != undefined ? this.storageDevices[2].manufacturer : undefined,
        storageDevice3_model: this.storageDevices[2] != undefined ? this.storageDevices[2].model : undefined,
        storageDevice3_description: this.storageDevices[2] != undefined ? this.storageDevices[2].description : undefined,
        storageDevice3_sizeInGB: this.storageDevices[2] != undefined ? this.storageDevices[2].sizeInGB : undefined,
        storageDevice3_architecture: this.storageDevices[2] != undefined ? this.storageDevices[2].architecture : undefined,
        storageDevice3_type: this.storageDevices[2] != undefined ? this.storageDevices[2].type : undefined,

        storageDevice4_id: this.storageDevices[3] != undefined ? this.storageDevices[3].id : undefined,
        storageDevice4_manufacturer: this.storageDevices[3] != undefined ? this.storageDevices[3].manufacturer : undefined,
        storageDevice4_model: this.storageDevices[3] != undefined ? this.storageDevices[3].model : undefined,
        storageDevice4_description: this.storageDevices[3] != undefined ? this.storageDevices[3].description : undefined,
        storageDevice4_sizeInGB: this.storageDevices[3] != undefined ? this.storageDevices[3].sizeInGB : undefined,
        storageDevice4_architecture: this.storageDevices[3] != undefined ? this.storageDevices[3].architecture : undefined,
        storageDevice4_type: this.storageDevices[3] != undefined ? this.storageDevices[3].type : undefined,

        storageDevice5_id: this.storageDevices[4] != undefined ? this.storageDevices[4].id : undefined,
        storageDevice5_manufacturer: this.storageDevices[4] != undefined ? this.storageDevices[4].manufacturer : undefined,
        storageDevice5_model: this.storageDevices[4] != undefined ? this.storageDevices[4].model : undefined,
        storageDevice5_description: this.storageDevices[4] != undefined ? this.storageDevices[4].description : undefined,
        storageDevice5_sizeInGB: this.storageDevices[4] != undefined ? this.storageDevices[4].sizeInGB : undefined,
        storageDevice5_architecture: this.storageDevices[4] != undefined ? this.storageDevices[4].architecture : undefined,
        storageDevice5_type: this.storageDevices[4] != undefined ? this.storageDevices[4].type : undefined,

        storageDevice6_id: this.storageDevices[5] != undefined ? this.storageDevices[5].id : undefined,
        storageDevice6_manufacturer: this.storageDevices[5] != undefined ? this.storageDevices[5].manufacturer : undefined,
        storageDevice6_model: this.storageDevices[5] != undefined ? this.storageDevices[5].model : undefined,
        storageDevice6_description: this.storageDevices[5] != undefined ? this.storageDevices[5].description : undefined,
        storageDevice6_sizeInGB: this.storageDevices[5] != undefined ? this.storageDevices[5].sizeInGB : undefined,
        storageDevice6_architecture: this.storageDevices[5] != undefined ? this.storageDevices[5].architecture : undefined,
        storageDevice6_type: this.storageDevices[5] != undefined ? this.storageDevices[5].type : undefined,

        storageDevice7_id: this.storageDevices[6] != undefined ? this.storageDevices[6].id : undefined,
        storageDevice7_manufacturer: this.storageDevices[6] != undefined ? this.storageDevices[6].manufacturer : undefined,
        storageDevice7_model: this.storageDevices[6] != undefined ? this.storageDevices[6].model : undefined,
        storageDevice7_description: this.storageDevices[6] != undefined ? this.storageDevices[6].description : undefined,
        storageDevice7_sizeInGB: this.storageDevices[6] != undefined ? this.storageDevices[6].sizeInGB : undefined,
        storageDevice7_architecture: this.storageDevices[6] != undefined ? this.storageDevices[6].architecture : undefined,
        storageDevice7_type: this.storageDevices[6] != undefined ? this.storageDevices[6].type : undefined,

        storageDevice8_id: this.storageDevices[7] != undefined ? this.storageDevices[7].id : undefined,
        storageDevice8_manufacturer: this.storageDevices[7] != undefined ? this.storageDevices[7].manufacturer : undefined,
        storageDevice8_model: this.storageDevices[7] != undefined ? this.storageDevices[7].model : undefined,
        storageDevice8_description: this.storageDevices[7] != undefined ? this.storageDevices[7].description : undefined,
        storageDevice8_sizeInGB: this.storageDevices[7] != undefined ? this.storageDevices[7].sizeInGB : undefined,
        storageDevice8_architecture: this.storageDevices[7] != undefined ? this.storageDevices[7].architecture : undefined,
        storageDevice8_type: this.storageDevices[7] != undefined ? this.storageDevices[7].type : undefined,
      };

      this.controller.createComputer(equipment);
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

  async electronicComponentModalPresent(electronicComponent: any) {
    const modal = await this.modalController.create({
      component: InfoElectronicComponentModalPage,
      componentProps: {
        electronicComponent: electronicComponent,
        editForm: false,        
      }
    });    
    return await modal.present();
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.create();
  }
}
