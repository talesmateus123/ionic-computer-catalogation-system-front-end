import { Component, OnInit } from '@angular/core';

import { ComputerDTO, MonitorDTO, EquipmentControllerService, ComputerNewDTO } from '../../shared';
import { SectorControllerService } from '../../../sectors';
import { ModalController } from '@ionic/angular';
import { InfoElectronicComponentModalPage } from '../../modals/electronic-components';
import { ProcessorDTO, RamMemoryDTO, StorageDeviceDTO } from '../electronic-components';
import { ComputerUserDTO } from 'src/app/pages/computer-users';
import { ComputerUsersModalPage, MonitorsModalPage } from '../../modals';
import { LoadingModalControllerService } from 'src/app/shared-resources';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {

  public filledValues: boolean = false;
  
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
	public formSectorId: number;

  public monitors: MonitorDTO[] = [];
  public processors: ProcessorDTO[] = [];
  public ramMemories: RamMemoryDTO[] = [];
  public storageDevices: StorageDeviceDTO[] = [];
  public computerUsers: ComputerUserDTO[] = [];

  public availableMonitors: MonitorDTO[];
  
  constructor(
    public controller: EquipmentControllerService,
    public sectorController: SectorControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
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

    this.initValues();
  }

  async initValues() {
    await this.loadingModalControllerService.loadingPresent();
    
    await this.sectorController.findAllSectors().toPromise().then((res) => {
      this.sectorController.sectors = res;
      this.loadingModalControllerService.loadingDismiss();
    });

    await this.populateAvailableAvailableMonitors();

    this.filledValues = true;
  }

  public addMonitor() {
    if(this.monitors.length < 1)
      this.monitors.push(undefined);
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

  public deleteMonitor(index: number) {
    this.monitors.splice(index, 1);
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

  async populateAvailableAvailableMonitors() {
    await this.controller.getAvailableMonitors()
      .toPromise().then(res => {
        this.availableMonitors = res;
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
      
      this.computerUsers.forEach(computerUser => {
        computerUsersId.push(computerUser.id);
      });

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
        monitorId: this.monitors[0] ? Number(this.monitors[0].id) : undefined,
        sectorId: this.formSectorId,
        computerUsersId: computerUsersId,

        processor_id: this.processors[0] != undefined ? this.processors[0].id : undefined,
        processor_manufacturer: this.processors[0] != undefined ? this.processors[0].manufacturer : undefined,
        processor_model: this.processors[0] != undefined ? this.processors[0].model : undefined,
        processor_description: this.processors[0] != undefined ? this.processors[0].description : undefined,
        processor_processorName: this.processors[0] != undefined ? this.processors[0].processorName : undefined,
        processor_architecture: this.processors[0] != undefined ? this.processors[0].architecture : undefined
      };

      for (let i=0; i<this.ramMemories.length; i++) {
        eval(`equipment.ramMemory${i+1}_id = '${this.ramMemories[i].id}'`);
        eval(`equipment.ramMemory${i+1}_manufacturer = '${this.ramMemories[i].manufacturer}'`);
        eval(`equipment.ramMemory${i+1}_model = '${this.ramMemories[i].model}'`);
        eval(`equipment.ramMemory${i+1}_description = '${this.ramMemories[i].description}'`);
        eval(`equipment.ramMemory${i+1}_sizeInGB = ${this.ramMemories[i].sizeInGB}`);
        eval(`equipment.ramMemory${i+1}_architecture = '${this.ramMemories[i].architecture}'`);
      }

      for (let i=0; i<this.storageDevices.length; i++) {
        eval(`equipment.storageDevice${i+1}_id = '${this.storageDevices[i].id}'`);
        eval(`equipment.storageDevice${i+1}_manufacturer = '${this.storageDevices[i].manufacturer}'`);
        eval(`equipment.storageDevice${i+1}_model = '${this.storageDevices[i].model}'`);
        eval(`equipment.storageDevice${i+1}_description = '${this.storageDevices[i].description}'`);
        eval(`equipment.storageDevice${i+1}_sizeInGB = ${this.storageDevices[i].sizeInGB}`);
        eval(`equipment.storageDevice${i+1}_architecture = '${this.storageDevices[i].architecture}'`);
        eval(`equipment.storageDevice${i+1}_type = '${this.storageDevices[i].type}'`);
      }

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

  async monitorsModalPresent(index: number) {
    const modal = await this.modalController.create({
      component: MonitorsModalPage,
      componentProps: {
        index: index,
        monitorsAlreadyEntered: this.availableMonitors
      }
    });    

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined)
        this.monitors.splice(dataReturned.data.index, 1, dataReturned.data.monitor);
    });
    return await modal.present();
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
      this.create();
  }
}
