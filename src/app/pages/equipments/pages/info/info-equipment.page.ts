import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ToastMessageControllerService, LoadingModalControllerService } from 'src/app/shared-resources';
import { MonitorDTO, EquipmentControllerService, ComputerNewDTO } from '../../shared';
import { SectorControllerService } from '../../../sectors';
import { InfoElectronicComponentModalPage } from '../../modals/electronic-components';
import { ComputerUserDTO } from '../../../computer-users';
import { ComputerUsersModalPage, MonitorsModalPage } from '../../modals';
import { RamMemoryDTO, StorageDeviceDTO, ProcessorDTO } from '../electronic-components';


@Component({
  selector: 'app-info-equipment',
  templateUrl: './info-equipment.page.html',
  styleUrls: ['./info-equipment.page.scss'],
})
export class InfoEquipmentPage implements OnInit {
  form: FormGroup;

  private id: string;

  public filledValues: boolean = false;

  public detailForm: boolean = false;
  public editForm: boolean = true;

  public equipment: any;

  public monitors: MonitorDTO[] = [];
  public processors: ProcessorDTO[] = [];
  public ramMemories: RamMemoryDTO[] = [];
  public storageDevices: StorageDeviceDTO[] = [];
  public computerUsers: ComputerUserDTO[] = [];

  public availableMonitors: MonitorDTO[];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastMessageControllerService: ToastMessageControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    private modalController: ModalController,
    public controller: EquipmentControllerService,
    public sectorController: SectorControllerService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.generateForm();
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
      this.controller.redirectToRootPage();
    });
  }

  generateForm() {
    this.form = this.formBuilder.group({
      patrimonyId: ['', [  ]],
      manufacturer: ['', [  ]],
      model: ['', [  ]],
      description: ['', [ Validators.maxLength(100) ]],
      ipAddress: ['', [
        Validators.pattern('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$') 
      ]],
      macAddress: ['', [ Validators.pattern('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$') ]],
      hostName: ['', [  ]],
      motherBoardName: ['', [  ]],
      hasCdBurner: [true, [  ]],
      cabinetModel: ['', [  ]],
      operatingSystem: ['NONE', [  ]],
      operatingSystemArchitecture: ['NONE', [  ]],
      computerType: ['DESKTOP', [ Validators.required ]],
      onTheDomain: [false, [ Validators.required ]],
      personalComputer: [false, [ Validators.required ]],
      teamViewerId: ['', [  ]],
      teamViewerPass: ['', [  ]],
      totalRamMemory: [0.0, [  ]],
      totalStorageMemory: [0.0, [  ]],
      monitorId: [, [  ]],
      sectorId: [, [ Validators.required ]],
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
      this.form.get('manufacturer').setValue(this.equipment.manufacturer);
      this.form.get('model').setValue(this.equipment.model);
      this.form.get('description').setValue(this.equipment.description);
      this.form.get('patrimonyId').setValue(this.equipment.patrimonyId);
      this.form.get('ipAddress').setValue(this.equipment.ipAddress);
      this.form.get('macAddress').setValue(this.equipment.macAddress);
      this.form.get('hostName').setValue(this.equipment.hostName);
      this.form.get('motherBoardName').setValue(this.equipment.motherBoardName);
      this.form.get('hasCdBurner').setValue(this.equipment.hasCdBurner);
      this.form.get('cabinetModel').setValue(this.equipment.cabinetModel);
      this.form.get('operatingSystem').setValue(this.equipment.operatingSystem);
      this.form.get('operatingSystemArchitecture').setValue(this.equipment.operatingSystemArchitecture);
      this.form.get('computerType').setValue(this.equipment.computerType);
      this.form.get('onTheDomain').setValue(this.equipment.onTheDomain);
      this.form.get('personalComputer').setValue(this.equipment.personalComputer);
      this.form.get('totalRamMemory').setValue(this.equipment.totalRamMemory);
      this.form.get('totalStorageMemory').setValue(this.equipment.totalStorageMemory);
      if (this.equipment.monitor !== null) {
        this.monitors[0] = this.equipment.monitor;
      }
      this.form.get('sectorId').setValue(this.equipment.sector.id);
      if ( this.equipment.processor != null) {
        this.processors[0] =  this.equipment.processor;
      }
      this.ramMemories = this.equipment.ramMemories;
      this.storageDevices = this.equipment.storageDevices;
      this.computerUsers = this.equipment.computerUsers;
    }
    else if (this.equipment.equipmentType === 'PRINTER' || this.equipment.equipmentType === 'NETWORK_DEVICE') {
      this.form.get('manufacturer').setValue(this.equipment.manufacturer);
      this.form.get('model').setValue(this.equipment.model);
      this.form.get('description').setValue(this.equipment.description);
      this.form.get('patrimonyId').setValue(this.equipment.patrimonyId);
      this.form.get('ipAddress').setValue(this.equipment.ipAddress);
      this.form.get('macAddress').setValue(this.equipment.macAddress);
      this.form.get('hostName').setValue(this.equipment.hostName);
      this.form.get('sectorId').setValue(this.equipment.sector.id);
    }
    else if (this.equipment.equipmentType === 'MONITOR') {
      this.form.get('manufacturer').setValue(this.equipment.manufacturer);
      this.form.get('model').setValue(this.equipment.model);
      this.form.get('description').setValue(this.equipment.description);
      this.form.get('patrimonyId').setValue(this.equipment.patrimonyId);
      this.form.get('sectorId').setValue(this.equipment.sector.id);
    }
  }

  private presentFormErrorMessages() {
    let errorMessages: string = '';

    if (this.form.controls.description.errors) {
      if (this.form.controls.description.errors.maxlength) {
        errorMessages = errorMessages +
          '- O campo descrição deve ter no máximo ' +
          this.form.controls.description.errors.maxlength.requiredLength +
          ' caracteres. <br>';
      }
    }

    if (this.form.controls.ipAddress.errors) {
      if (this.form.controls.ipAddress.errors.pattern) {
        errorMessages = errorMessages + '- Endereço IP inválido, deve coincidir com \"10.1.1.50\". <br>';
      }
    }

    if (this.form.controls.macAddress.errors) {
      errorMessages = errorMessages + '- Endereço MAC inválido, deve coincidir com \"00:19:B9:FB:E2:57\". <br>';
    }

    this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos', errorMessages);
  }

  update() {
    if (this.form.invalid) {
      this.presentFormErrorMessages();
      return;
    }

    if (this.equipment.equipmentType === 'COMPUTER') {
      if (!this.detailForm) {
        this.form.get('motherBoardName').setValue(undefined);
        this.form.get('cabinetModel').setValue(undefined);
        this.ramMemories = [];
        this.storageDevices = [];
      }

      const computerUsersId: string[] = [];

      this.computerUsers.forEach(computerUser => {
        if (computerUser) {
          computerUsersId.push(computerUser.id);
        }
      });

      const monitorId: number = this.monitors[0] ? Number(this.monitors[0].id) : undefined;

      const equipment: ComputerNewDTO = {
        patrimonyId: this.form.get('patrimonyId').value,
        manufacturer: this.form.get('manufacturer').value,
        model: this.form.get('model').value,
        description: this.form.get('description').value,
        ipAddress: this.form.get('ipAddress').value,
        macAddress: this.form.get('macAddress').value,
        hostName: this.form.get('hostName').value,
        motherBoardName: this.form.get('motherBoardName').value,
        hasCdBurner: this.form.get('hasCdBurner').value,
        cabinetModel: this.form.get('cabinetModel').value,
        operatingSystem: this.form.get('operatingSystem').value,
        operatingSystemArchitecture: this.form.get('operatingSystemArchitecture').value,
        computerType: this.form.get('computerType').value,
        onTheDomain: this.form.get('onTheDomain').value,
        personalComputer: this.form.get('personalComputer').value,
        totalRamMemory: this.form.get('totalRamMemory').value,
        totalStorageMemory: this.form.get('totalStorageMemory').value,
        sectorId: this.form.get('sectorId').value,
        monitorId,
        computerUsersId
      };

      // Validation in processor and others hardware devices is missing
      if (this.processors[0]) {
        equipment.processor_id = this.processors[0].id;
        equipment.processor_manufacturer = this.processors[0].manufacturer;
        equipment.processor_model = this.processors[0].model;
        equipment.processor_description = this.processors[0].description;
        equipment.processor_processorName = this.processors[0].processorName;
        equipment.processor_architecture = this.processors[0].architecture;
      }

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
          manufacturer: this.form.get('manufacturer').value,
          model: this.form.get('model').value,
          description: this.form.get('description').value,
          patrimonyId: this.form.get('patrimonyId').value,
          ipAddress: this.form.get('ipAddress').value,
          macAddress: this.form.get('macAddress').value,
          hostName: this.form.get('hostName').value,
          sectorId: this.form.get('sectorId').value
        }
      );
    }
    else if (this.equipment.equipmentType === 'NETWORK_DEVICE') {
      this.controller.updateNetworkDevice(this.id,
        {
          manufacturer: this.form.get('manufacturer').value,
          model: this.form.get('model').value,
          description: this.form.get('description').value,
          patrimonyId: this.form.get('patrimonyId').value,
          ipAddress: this.form.get('ipAddress').value,
          macAddress: this.form.get('macAddress').value,
          hostName: this.form.get('hostName').value,
          sectorId: this.form.get('sectorId').value
        }
      );
    }
    else if (this.equipment.equipmentType === 'MONITOR') {
      this.controller.updateMonitor(this.id,
        {
          manufacturer: this.form.get('manufacturer').value,
          model: this.form.get('model').value,
          description: this.form.get('description').value,
          patrimonyId: this.form.get('patrimonyId').value,
          sectorId: this.form.get('sectorId').value
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
