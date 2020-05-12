import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ComputerService, MonitorService, PrinterService, ComputerDTO, MonitorDTO } from '../shared';
import { ComputerNewDTO, MonitorNewDTO, PrinterNewDTO } from '../shared';
import { SectorDTO } from 'src/app/models/sector.dto';
import { SectorService } from '../../sectors/shared';
import { ProcessorDTO } from 'src/app/models/processor.dto';
import { ComputerUserDTO } from 'src/app/models/computer_user.dto';
import { StorageDeviceDTO } from 'src/app/models/storage_device.dto';
import { RamMemoryDTO } from 'src/app/models/ram_memory.dto';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.page.html',
  styleUrls: ['./new-equipment.page.scss'],
})
export class NewEquipmentPage implements OnInit {
  equipmentTypes: string[] =[
    "Computador",
    "Impressora",
    "Monitor",
  ];
  equipmentType = "Computador";

  formSectors: number[];
  formComputers: number[];
  formManufacturer: string;
  formModel: string;
  formDescription: string;
  formItWorks: boolean
  formPatrimonyId: string;
  formIpAddress: string;
  formHostName: string;
  formMotherBoardName: string;
  formHasCdBurner: boolean;
  formCabinetModel: string;
  formOperatingSystem: number;
  formOperatingSystemArchitecture: number;
  formOnTheDomain: boolean;
  formProcessorId: number;
  formMonitorId: number;
  formComputerId: number;
  formSectorId: number;
  formRamMemoriesId: number[];
  formStorageDevicesId: number[];
  formComputerUsersId: number[];

  computer: ComputerNewDTO;
  printer: PrinterNewDTO;
  monitor: MonitorNewDTO;
  sectors: SectorDTO[];
  computers: ComputerDTO[];
  monitors: MonitorDTO[];
  
  constructor(
    public alertController: AlertController,
    private router: Router,
    private computerService: ComputerService,
    private monitorService: MonitorService,
    private printerService: PrinterService,
    private sectorService: SectorService
  ) { }

  ngOnInit() {
    this.populateSectors();
    this.populateComputers();
    this.populateMonitors();
  }

  populateSectors() {
    this.sectorService.findAll()
      .subscribe(response => {
        this.sectors = response;
      },
      error => {
        console.log(error);
      });
  }

  populateComputers() {
    this.computerService.findAll()
      .subscribe(response => {
        this.computers = response;
      },
      error => {
        console.log(error);
      });
  }

  populateMonitors() {
    this.monitorService.findAll()
      .subscribe(response => {
        this.monitors = response;
      },
      error => {
        console.log(error);
      });
  }

  create() {
    if(this.equipmentType === "Computador"){
      this.computer = {
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
        ramMemoriesId: this.formRamMemoriesId,
        storageDevicesId: this.formStorageDevicesId,
        computerUsersId: this.formComputerUsersId
      }
      this.computerService.create(this.computer).subscribe(
        res => {          
          this.successMessageAlert();
          this.router.navigate(['/equipments']);
        },
        error => {
          this.errorMessageAlert();
        }
      )
    }
    else if(this.equipmentType === "Impressora") {
      this.printer = {
        manufacturer: this.formManufacturer,
        model: this.formModel,
        description: this.formDescription,
        itWorks: this.formItWorks,
        patrimonyId: this.formPatrimonyId,
        ipAddress: this.formIpAddress,
	      hostName: this.formHostName,
        sectorId: this.formSectorId,
        
      }
      this.printerService.create(this.printer).subscribe(
        res => {          
          this.successMessageAlert();
          this.router.navigate(['/equipments']);
        },
        error => {
          this.errorMessageAlert();
        }
      )
    }
    else if(this.equipmentType === "Monitor") {      
      this.monitor = {
        manufacturer: this.formManufacturer,
        model: this.formModel,
        description: this.formDescription,
        itWorks: this.formItWorks,
        patrimonyId: this.formPatrimonyId,
        sectorId: this.formSectorId,
	      computerId: null
      }
      this.monitorService.create(this.monitor).subscribe(
        res => {          
          this.successMessageAlert();
          this.router.navigate(['/equipments']);
        },
        error => {
          this.errorMessageAlert();
        }
      )
    }
  }
  
  async successMessageAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      //subHeader: 'Subtitle',
      message: 'Objeto criado com sucesso.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async errorMessageAlert() {
    const alert = await this.alertController.create({
      header: 'Opps!',
      //subHeader: 'Subtitle',
      message: 'Parece que ocorreu um erro.',
      buttons: ['OK']
    });

    await alert.present();
  }
}