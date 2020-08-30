import { Component, OnInit } from '@angular/core';

import { MonitorDTO, EquipmentControllerService, ComputerNewDTO } from '../../shared';
import { SectorControllerService } from '../../../sectors';
import { ModalController } from '@ionic/angular';
import { InfoElectronicComponentModalPage } from '../../modals/electronic-components';
import { ActivatedRoute } from '@angular/router';
import { ComputerUserDTO } from '../../../computer-users';
import { ComputerUsersModalPage, MonitorsModalPage } from '../../modals';

import { RamMemoryDTO, StorageDeviceDTO, ProcessorDTO } from '../electronic-components'
import { LoadingModalControllerService } from 'src/app/shared-resources';

@Component({
  selector: 'app-info-equipment',
  templateUrl: './info-equipment.page.html',
  styleUrls: ['./info-equipment.page.scss'],
})
export class InfoEquipmentPage implements OnInit {
  private id: string;

  public filledValues: boolean = false;

  public detailForm: boolean = false;
  public editForm: boolean = true;

  public equipment: any;

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
	public formOperatingSystem: string = 'NONE';
	public formOperatingSystemArchitecture: string = 'NONE';
	public formComputerType: string = 'DESKTOP';
	public formOnTheDomain: boolean = false;
	public formPersonalComputer: boolean = false;
	public formTotalRamMemory: number = 0;
	public formTotalStorageMemory: number = 0;
	public formMonitorId: number;
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
    private route: ActivatedRoute,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initValues();
  }

  async initValues() {
    await this.loadingModalControllerService.loadingPresent();

    await this.sectorController.findAllSectors().toPromise().then((res) => {
      this.sectorController.sectors = res;
    });

    await this.controller.findEquipment(this.id).toPromise().then(
      async res => {
        this.equipment = res;
        if (res.equipmentType === 'COMPUTER') {
          if (this.equipment.ramMemories.length > 0 || this.equipment.storageDevices.length > 0) {
            this.detailForm = true;
          }
          await this.populateAvailableAvailableMonitors();
        }
        await this.populateForm();
        this.filledValues = true;
        this.loadingModalControllerService.loadingDismiss();
      }
    )
    .catch(() => {
      this.controller.redirectToRootPage()
    });
  }

  public addMonitor() {
    if (this.monitors.length < 1) {
      this.monitors.push(undefined);
    }
  }

  public addProcessor() {
    if (this.processors.length < 1) {
      this.processors.push({
        id: null,
        createdDate: null,
        lastModifiedDate: null,
        equipmentType: 'PROCESSOR',
	      manufacturer: '',
	      model: '',
	      description: '',
	      processorName: '',
	      architecture: 'AMD64'
      });
    }
  }

  public addRamMemory() {
    if (this.ramMemories.length < 8) {
      this.ramMemories.push({
        id: null,
        createdDate: null,
        lastModifiedDate: null,
        equipmentType: 'RAM_MEMORY',
        manufacturer: '',
        model: '',
        description: '',
        sizeInGB: 0,
        architecture: 'DDR3'
      });
    }
  }

  public addStorageDevice() {
    if (this.storageDevices.length < 8) {
      this.storageDevices.push({
        id: null,
        createdDate: null,
        lastModifiedDate: null,
        equipmentType: 'STORAGE_DEVICE',
        manufacturer: '',
        model: '',
        description: '',
        sizeInGB: 0,
        architecture: 'SATA',
        type: 'HD'
      });
    }
  }

  public addUser() {
    if (this.computerUsers.length < 5) {
      this.computerUsers.push(undefined);
    }
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

  public setEditForm() {
    this.editForm = !this.editForm;
  }

  private async populateAvailableAvailableMonitors() {
    await this.controller.getAvailableMonitors().toPromise().then((res) => {
      this.availableMonitors = res;
      if (this.equipment.monitor !== null) {
        this.availableMonitors.push(this.equipment.monitor);
      }
    });
  }

  private async populateForm() {
    if (this.equipment.equipmentType === 'COMPUTER') {
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
      if (this.equipment.monitor !== null) {
        this.monitors[0] = this.equipment.monitor;
      }
      this.formSectorId = this.equipment.sector.id;
      if ( this.equipment.processor != null) {
        this.processors[0] =  this.equipment.processor;
      }
      this.ramMemories = this.equipment.ramMemories;
      this.storageDevices = this.equipment.storageDevices;
      this.computerUsers = this.equipment.computerUsers;
    }
    else if (this.equipment.equipmentType === 'PRINTER' || this.equipment.equipmentType === 'NETWORK_DEVICE') {
      this.formManufacturer = this.equipment.manufacturer;
      this.formModel = this.equipment.model;
      this.formDescription = this.equipment.description;
      this.formPatrimonyId = this.equipment.patrimonyId;
      this.formIpAddress = this.equipment.ipAddress;
      this.formMacAddress = this.equipment.macAddress;
      this.formHostName = this.equipment.hostName;
      this.formSectorId = this.equipment.sector.id;
    }
    else if (this.equipment.equipmentType === 'MONITOR') {
      this.formManufacturer = this.equipment.manufacturer;
      this.formModel = this.equipment.model;
      this.formDescription = this.equipment.description;
      this.formPatrimonyId = this.equipment.patrimonyId;
      // this.formComputerId = this.monitor.computer;
      this.formSectorId = this.equipment.sector.id;
    }
  }

  update() {
    if (this.equipment.equipmentType === 'COMPUTER') {
      if (!this.detailForm) {
        this.formMotherBoardName = undefined;
        this.formCabinetModel = undefined;
        this.ramMemories = [];
        this.storageDevices = [];
      }

      const computerUsersId: string[] = [];

      this.computerUsers.forEach(computerUser => {
        computerUsersId.push(computerUser.id);
      });

      const equipment: ComputerNewDTO = {
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
        computerUsersId,
        processor_id: this.processors[0] ? this.processors[0].id : undefined,
        processor_manufacturer: this.processors[0] ? this.processors[0].manufacturer : undefined,
        processor_model: this.processors[0] ? this.processors[0].model : undefined,
        processor_description: this.processors[0] ? this.processors[0].description : undefined,
        processor_processorName: this.processors[0] ? this.processors[0].processorName : undefined,
        processor_architecture: this.processors[0] ? this.processors[0].architecture : undefined
      };

      for (let i = 0; i < this.ramMemories.length; i++) {
        eval(`equipment.ramMemory${i + 1}_id = '${this.ramMemories[i].id}'`);
        eval(`equipment.ramMemory${i + 1}_manufacturer = '${this.ramMemories[i].manufacturer}'`);
        eval(`equipment.ramMemory${i + 1}_model = '${this.ramMemories[i].model}'`);
        eval(`equipment.ramMemory${i + 1}_description = '${this.ramMemories[i].description}'`);
        eval(`equipment.ramMemory${i + 1}_sizeInGB = ${this.ramMemories[i].sizeInGB}`);
        eval(`equipment.ramMemory${i + 1}_architecture = '${this.ramMemories[i].architecture}'`);
      }

      for (let i = 0; i < this.storageDevices.length; i++) {
        eval(`equipment.storageDevice${i + 1}_id = '${this.storageDevices[i].id}'`);
        eval(`equipment.storageDevice${i + 1}_manufacturer = '${this.storageDevices[i].manufacturer}'`);
        eval(`equipment.storageDevice${i + 1}_model = '${this.storageDevices[i].model}'`);
        eval(`equipment.storageDevice${i + 1}_description = '${this.storageDevices[i].description}'`);
        eval(`equipment.storageDevice${i + 1}_sizeInGB = ${this.storageDevices[i].sizeInGB}`);
        eval(`equipment.storageDevice${i + 1}_architecture = '${this.storageDevices[i].architecture}'`);
        eval(`equipment.storageDevice${i + 1}_type = '${this.storageDevices[i].type}'`);
      }

      this.controller.updateComputer(this.id, equipment);
    }
    else if (this.equipment.equipmentType === 'PRINTER') {
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
    else if (this.equipment.equipmentType === 'NETWORK_DEVICE') {
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
    else if (this.equipment.equipmentType === 'MONITOR') {
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
    if (this.equipment.equipmentType === 'COMPUTER') {
      this.controller.deleteComputer(this.id);
    }
    else if (this.equipment.equipmentType === 'PRINTER') {
      this.controller.deletePrinter(this.id);
    }
    else if (this.equipment.equipmentType === 'NETWORK_DEVICE') {
      this.controller.deleteNetworkDevice(this.id);
    }
    else if (this.equipment.equipmentType === 'MONITOR') {
      this.controller.deleteMonitor(this.id);
    }
  }

  async monitorsModalPresent(index: number) {
    const modal = await this.modalController.create({
      component: MonitorsModalPage,
      componentProps: {
        index,
        monitorsAlreadyEntered: this.availableMonitors
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.monitors.splice(dataReturned.data.index, 1, dataReturned.data.monitor);
      }
    });
    return await modal.present();
  }

  async electronicComponentModalPresent(electronicComponent: any) {
    const modal = await this.modalController.create({
      component: InfoElectronicComponentModalPage,
      componentProps: {
        electronicComponent,
        editForm: false,
      }
    });
    return await modal.present();
  }

  async computerUsersModalPagePresent(index: number) {
    const modal = await this.modalController.create({
      component: ComputerUsersModalPage,
      componentProps: {
        index,
        computerUsersAlreadyEntered: this.computerUsers
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.computerUsers.splice(dataReturned.data.index, 1, dataReturned.data.computerUser);
      }
    });
    return await modal.present();
  }

  eventHandler($keyCode) {
    if ($keyCode === 13) {
      this.update();
    }
  }
}
