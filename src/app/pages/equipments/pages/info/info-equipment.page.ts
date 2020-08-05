import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

import { MonitorDTO, EquipmentControllerService } from '../../shared';
import { SectorControllerService } from '../../../sectors';
import { ModalController } from '@ionic/angular';
import { InfoElectronicComponentModalPage } from '../../modals/electronic-components';
import { ActivatedRoute } from '@angular/router';
import { ComputerUserDTO } from '../../../computer-users';
import { ComputerUsersModalPage } from '../../modals';

import { RamMemoryDTO, StorageDeviceDTO, ProcessorDTO } from '../electronic-components'

@Component({
  selector: 'app-info-equipment',
  templateUrl: './info-equipment.page.html',
  styleUrls: ['./info-equipment.page.scss'],
})
export class InfoEquipmentPage implements OnInit {
  @ViewChild('formEquipment', { static: false }) formEquipment: NgForm;
  private id: string;

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
    private route: ActivatedRoute,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.controller.loadingPresent();
    this.id = this.route.snapshot.paramMap.get('id')
    this.sectorController.updateSectorsList();
    this.controller.findEquipment(this.id).subscribe(
      res => {
        let response = res;
        this.equipmentType = response.equipmentType
        if(this.equipmentType === "COMPUTER") {
          this.equipment = response;
          if(this.equipment.ramMemories.length > 0 || this.equipment.storageDevices.length > 0) {
            this.detailForm = true;
          }
          this.populateAvailableAvailableMonitors();
        }
        else if(this.equipmentType === "PRINTER" || this.equipmentType === "NETWORK_DEVICE") {
          this.equipment = response;
        }
        else if(this.equipmentType === "MONITOR") {
          this.equipment = response;
        }
        this.populateForm();
        this.controller.loadingDismiss();
      },
      error => {
        this.controller.errorMessageAlert(error);
        this.controller.redirectToRootPage();
      }
    );
    this.editForm = true;    
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
    this.computerUsers.splice(index, 1);
  }

  public deleteStorageDevice(index: number) {
    this.computerUsers.splice(index, 1);
  }

  public deleteUser(index: number) {
    this.computerUsers.splice(index, 1);
  }

  setEditForm() {
    if (this.editForm)
      this.editForm = false;
    else
      this.editForm = true;
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
      this.formPatrimonyId = this.equipment.patrimonyId;
      this.formIpAddress = this.equipment.ipAddress;
      this.formMacAddress = this.equipment.macAddress;
      this.formHostName = this.equipment.hostName;
      this.formMotherBoardName = this.equipment.motherBoardName;
      this.formHasCdBurner = this.equipment.hasCdBurner;
      this.formCabinetModel = this.equipment.cabinetModel;
      this.formOperatingSystem = this.equipment.operatingSystem;
      this.formOperatingSystemArchitecture = this.equipment.operatingSystemArchitecture;
      this.formComputerType = this.equipment.computerType;
      this.formOnTheDomain = this.equipment.onTheDomain;
      this.formPersonalComputer = this.equipment.personalComputer;
      this.formTotalRamMemory = this.equipment.totalRamMemory;
      this.formTotalStorageMemory = this.equipment.totalStorageMemory;
      if (this.equipment.monitor !== null)   
        this.formMonitorId = this.equipment.monitor.id;
      this.formSectorId = this.equipment.sector.id;
      this.processors[0] = this.equipment.processor
      this.computerUsers = this.equipment.computerUsers;
    }
    else if(this.equipmentType === "PRINTER" || this.equipmentType === "NETWORK_DEVICE") {
      this.formManufacturer = this.equipment.manufacturer;
      this.formModel = this.equipment.model;
      this.formDescription = this.equipment.description;
      this.formPatrimonyId = this.equipment.patrimonyId;
      this.formIpAddress = this.equipment.ipAddress;
      this.formMacAddress = this.equipment.macAddress;
      this.formHostName = this.equipment.hostName;
      this.formSectorId = this.equipment.sector.id;
    }
    else if(this.equipmentType === "MONITOR") {    
      this.formManufacturer = this.equipment.manufacturer;
      this.formModel = this.equipment.model;
      this.formDescription = this.equipment.description;
      this.formPatrimonyId = this.equipment.patrimonyId;
      // this.formComputerId = this.monitor.computer;
      this.formSectorId = this.equipment.sector.id;
    }
  }

  update() {
    if(!this.detailForm){
      this.formMotherBoardName = undefined;
      this.formCabinetModel = undefined;
      this.ramMemories = [];
      this.storageDevices = [];
      // Ram memories and storage devices is missing
    }
    if(this.equipmentType === "COMPUTER") {
      let computerUsersId: string[] = [];
      for(let computerUser in this.computerUsers) {
       computerUsersId.push(this.computerUsers[computerUser].id);
      }
      this.controller.updateComputer(this.id, 
        {
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
        
          // Ram memories attributes
          ramMemory1_id: this.ramMemories[0].id,
          ramMemory1_manufacturer: this.ramMemories[0].manufacturer,
          ramMemory1_model: this.ramMemories[0].model,
          ramMemory1_description: this.ramMemories[0].description,
          ramMemory1_sizeInGB: this.ramMemories[0].sizeInGB,
          ramMemory1_architecture: this.ramMemories[0].architecture,
        
          ramMemory2_id: this.ramMemories[1].id,
          ramMemory2_manufacturer: this.ramMemories[1].manufacturer,
          ramMemory2_model: this.ramMemories[1].model,
          ramMemory2_description: this.ramMemories[1].description,
          ramMemory2_sizeInGB: this.ramMemories[1].sizeInGB,
          ramMemory2_architecture: this.ramMemories[1].architecture,
        
          ramMemory3_id: this.ramMemories[2].id,
          ramMemory3_manufacturer: this.ramMemories[2].manufacturer,
          ramMemory3_model: this.ramMemories[2].model,
          ramMemory3_description: this.ramMemories[2].description,
          ramMemory3_sizeInGB: this.ramMemories[2].sizeInGB,
          ramMemory3_architecture: this.ramMemories[2].architecture,
        
          ramMemory4_id: this.ramMemories[3].id,
          ramMemory4_manufacturer: this.ramMemories[3].manufacturer,
          ramMemory4_model: this.ramMemories[3].model,
          ramMemory4_description: this.ramMemories[3].description,
          ramMemory4_sizeInGB: this.ramMemories[3].sizeInGB,
          ramMemory4_architecture: this.ramMemories[3].architecture,
        
          ramMemory5_id: this.ramMemories[4].id,
          ramMemory5_manufacturer: this.ramMemories[4].manufacturer,
          ramMemory5_model: this.ramMemories[4].model,
          ramMemory5_description: this.ramMemories[4].description,
          ramMemory5_sizeInGB: this.ramMemories[4].sizeInGB,
          ramMemory5_architecture: this.ramMemories[4].architecture,
        
          ramMemory6_id: this.ramMemories[5].id,
          ramMemory6_manufacturer: this.ramMemories[5].manufacturer,
          ramMemory6_model: this.ramMemories[5].model,
          ramMemory6_description: this.ramMemories[5].description,
          ramMemory6_sizeInGB: this.ramMemories[5].sizeInGB,
          ramMemory6_architecture: this.ramMemories[5].architecture,
        
          ramMemory7_id: this.ramMemories[6].id,
          ramMemory7_manufacturer: this.ramMemories[6].manufacturer,
          ramMemory7_model: this.ramMemories[6].model,
          ramMemory7_description: this.ramMemories[6].description,
          ramMemory7_sizeInGB: this.ramMemories[6].sizeInGB,
          ramMemory7_architecture: this.ramMemories[6].architecture,
        
          ramMemory8_id: this.ramMemories[7].id,
          ramMemory8_manufacturer: this.ramMemories[7].manufacturer,
          ramMemory8_model: this.ramMemories[7].model,
          ramMemory8_description: this.ramMemories[7].description,
          ramMemory8_sizeInGB: this.ramMemories[7].sizeInGB,
          ramMemory8_architecture: this.ramMemories[7].architecture,

          storageDevice1_id: this.storageDevices[0].id,
          storageDevice1_manufacturer: this.storageDevices[0].manufacturer,
          storageDevice1_model: this.storageDevices[0].model,
          storageDevice1_description: this.storageDevices[0].description,
          storageDevice1_sizeInGB: this.storageDevices[0].sizeInGB,
          storageDevice1_architecture: this.storageDevices[0].architecture,
          storageDevice1_type: this.storageDevices[0].type,

          storageDevice2_id: this.storageDevices[1].id,
          storageDevice2_manufacturer: this.storageDevices[1].manufacturer,
          storageDevice2_model: this.storageDevices[1].model,
          storageDevice2_description: this.storageDevices[1].description,
          storageDevice2_sizeInGB: this.storageDevices[1].sizeInGB,
          storageDevice2_architecture: this.storageDevices[1].architecture,
          storageDevice2_type: this.storageDevices[1].type,
          
          storageDevice3_id: this.storageDevices[2].id,
          storageDevice3_manufacturer: this.storageDevices[2].manufacturer,
          storageDevice3_model: this.storageDevices[2].model,
          storageDevice3_description: this.storageDevices[2].description,
          storageDevice3_sizeInGB: this.storageDevices[2].sizeInGB,
          storageDevice3_architecture: this.storageDevices[2].architecture,
          storageDevice3_type: this.storageDevices[2].type,

          storageDevice4_id: this.storageDevices[3].id,
          storageDevice4_manufacturer: this.storageDevices[3].manufacturer,
          storageDevice4_model: this.storageDevices[3].model,
          storageDevice4_description: this.storageDevices[3].description,
          storageDevice4_sizeInGB: this.storageDevices[3].sizeInGB,
          storageDevice4_architecture: this.storageDevices[3].architecture,
          storageDevice4_type: this.storageDevices[3].type,

          storageDevice5_id: this.storageDevices[4].id,
          storageDevice5_manufacturer: this.storageDevices[4].manufacturer,
          storageDevice5_model: this.storageDevices[4].model,
          storageDevice5_description: this.storageDevices[4].description,
          storageDevice5_sizeInGB: this.storageDevices[4].sizeInGB,
          storageDevice5_architecture: this.storageDevices[4].architecture,
          storageDevice5_type: this.storageDevices[4].type,

          storageDevice6_id: this.storageDevices[5].id,
          storageDevice6_manufacturer: this.storageDevices[5].manufacturer,
          storageDevice6_model: this.storageDevices[5].model,
          storageDevice6_description: this.storageDevices[5].description,
          storageDevice6_sizeInGB: this.storageDevices[5].sizeInGB,
          storageDevice6_architecture: this.storageDevices[5].architecture,
          storageDevice6_type: this.storageDevices[5].type,
          
          storageDevice7_id: this.storageDevices[6].id,
          storageDevice7_manufacturer: this.storageDevices[6].manufacturer,
          storageDevice7_model: this.storageDevices[6].model,
          storageDevice7_description: this.storageDevices[6].description,
          storageDevice7_sizeInGB: this.storageDevices[6].sizeInGB,
          storageDevice7_architecture: this.storageDevices[6].architecture,
          storageDevice7_type: this.storageDevices[6].type,

          storageDevice8_id: this.storageDevices[8].id,
          storageDevice8_manufacturer: this.storageDevices[8].manufacturer,
          storageDevice8_model: this.storageDevices[8].model,
          storageDevice8_description: this.storageDevices[8].description,
          storageDevice8_sizeInGB: this.storageDevices[8].sizeInGB,
          storageDevice8_architecture: this.storageDevices[8].architecture,
          storageDevice8_type: this.storageDevices[8].type
        }
      );
    }
    else if(this.equipmentType === "PRINTER") {
      this.controller.updatePrinter(this.id, 
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
      this.controller.updateNetworkDevice(this.id, 
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
      this.controller.updateMonitor(this.id, 
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

  delete() {
    if(this.equipmentType === "COMPUTER")
      this.controller.deleteComputer(this.id);
    else if(this.equipmentType === "PRINTER")
      this.controller.deletePrinter(this.id);
    else if(this.equipmentType === "MONITOR")
      this.controller.deleteMonitor(this.id);
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

  async computerUsersModalPagePresent(index: number) {
    const modal = await this.modalController.create({
      component: ComputerUsersModalPage,
      componentProps: {
        index: index,
        computerUsersAlreadyEntered: this.computerUsers
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined)
        this.computerUsers.splice(dataReturned.data.index, 1, dataReturned.data.computerUser);
    });
    return await modal.present();
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.update();
  }
}
