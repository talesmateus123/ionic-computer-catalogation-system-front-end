import { HelpEquipmentModalPage } from './../../modals/help/help-equipment-modal.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastMessageControllerService, LoadingModalControllerService } from 'src/app/shared-resources';
import { MonitorDTO, EquipmentControllerService, ComputerNewDTO } from '../../shared';
import { SectorControllerService } from '../../../sectors';
import { ModalController } from '@ionic/angular';
import { InfoElectronicComponentModalPage } from '../../modals/electronic-components';
import { ProcessorDTO, RamMemoryDTO, StorageDeviceDTO } from '../electronic-components';
import { ComputerUserDTO } from 'src/app/pages/computer-users';
import { ComputerUsersModalPage, MonitorsModalPage } from '../../modals';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {
  form: FormGroup;

  public filledValues = false;

  public detailForm = false;
  public editForm = false;

  public equipment: any;
  public equipmentType: string;

  public monitors: MonitorDTO[] = [];
  public processors: ProcessorDTO[] = [];
  public ramMemories: RamMemoryDTO[] = [];
  public storageDevices: StorageDeviceDTO[] = [];
  public computerUsers: ComputerUserDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageControllerService: ToastMessageControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    private modalController: ModalController,
    public controller: EquipmentControllerService,
    public sectorController: SectorControllerService,
  ) { }

  ngOnInit() {
    if (this.controller.equipmentType === 'Computadores') {
      this.equipmentType = 'COMPUTER';
    } else if (this.controller.equipmentType === 'Impressoras') {
      this.equipmentType = 'PRINTER';
    } else if (this.controller.equipmentType === 'Dispositivos de rede') {
      this.equipmentType = 'NETWORK_DEVICE';
    } else if (this.controller.equipmentType === 'Monitores') {
      this.equipmentType = 'MONITOR';
    }

    this.generateForm();
    this.initValues();
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

  async initValues() {
    await this.loadingModalControllerService.loadingPresent();

    await this.sectorController.findAllSectors().toPromise().then((res) => {
      this.sectorController.sectors = res;
      this.loadingModalControllerService.loadingDismiss();
    });

    this.filledValues = true;
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

    if (this.form.controls.sectorId.errors) {
      if (this.form.controls.sectorId.errors.required) {
        errorMessages = errorMessages + '- O campo setor é obrigatório. <br>';
      }
    }
    this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos', errorMessages);
  }

  public create() {
    if (this.form.invalid) {
      this.presentFormErrorMessages();
      return;
    }

    if (this.equipmentType === 'COMPUTER') {
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
        teamViewerId: this.form.get('teamViewerId').value,
        teamViewerPass: this.form.get('teamViewerPass').value,
        totalRamMemory: this.form.get('totalRamMemory').value,
        totalStorageMemory: this.form.get('totalStorageMemory').value,
        sectorId: this.form.get('sectorId').value,
        monitorId,
        computerUsersId
      };

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

      this.controller.createComputer(equipment);
    } else if (this.equipmentType === 'PRINTER') {
      this.controller.createPrinter(
        {
          manufacturer: this.form.get('manufacturer').value,
          model: this.form.get('model').value,
          description: this.form.get('description').value,
          patrimonyId: this.form.get('patrimonyId').value,
          ipAddress: this.form.get('ipAddress').value,
          macAddress: this.form.get('macAddress').value,
          hostName: this.form.get('hostName').value,
          sectorId: this.form.get('sectorId').value        }
      );
    } else if (this.equipmentType === 'NETWORK_DEVICE') {
      this.controller.createNetworkDevice(
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
    } else if (this.equipmentType === 'MONITOR') {
      this.controller.createMonitor(
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

  async helpEquipmentModalPresent() {
    const modal = await this.modalController.create({
      component: HelpEquipmentModalPage,
      componentProps: {
        editForm: this.editForm,
        teamViewerId: this.form.get('teamViewerId').value,
        teamViewerPass: this.form.get('teamViewerPass').value
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.form.get('teamViewerId').setValue(dataReturned.data.teamViewerId);
        this.form.get('teamViewerPass').setValue(dataReturned.data.teamViewerPass);
      }
    });
    return await modal.present();
  }

  async monitorsModalPresent(index: number) {
    const modal = await this.modalController.create({
      component: MonitorsModalPage,
      componentProps: {
        index,
        monitorAlreadyEntered: this.equipment.monitor
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
      this.create();
    }
  }
}
