import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ComputerService, MonitorService, PrinterService, ComputerNewDTO, PrinterNewDTO, MonitorNewDTO, ComputerDTO, MonitorDTO, PrinterDTO, EquipmentDTO, EquipmentService, PageService } from '../shared';
import { SectorService } from '../../sectors/shared';
import { SectorDTO } from 'src/app/models/sector.dto';

@Component({
  selector: 'app-info-equipment',
  templateUrl: './info-equipment.page.html',
  styleUrls: ['./info-equipment.page.scss'],
})
export class InfoEquipmentPage implements OnInit {
  id: string;
  equipmentType: string;
  editForm: boolean

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
  formOperatingSystem: string;
  formOperatingSystemArchitecture: string;
  formOnTheDomain: boolean;
  formProcessorId: number;
  formMonitorId: number;
  formSectorId: number;
  formRamMemoriesId: number[];
  formStorageDevicesId: number[];
  formComputerUsersId: number[];

  computer: ComputerDTO;
  printer: PrinterDTO;
  monitor: MonitorDTO;

  equipmentDTO: EquipmentDTO;

  sectors: SectorDTO[];
  computers: ComputerDTO[];
  monitors: MonitorDTO[];

  constructor(
    public pageService: PageService,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private equipmentService: EquipmentService,
    private computerService: ComputerService,
    private monitorService: MonitorService,
    private printerService: PrinterService,
    private sectorService: SectorService
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.populateSectors();
    this.populateComputers();
    this.populateMonitors();
    this.findEquipment();
    this.editForm = true;
  }

  setEditForm() {
    if (this.editForm)
      this.editForm = false;
    else
      this.editForm = true;
  }

  findEquipment() {
    this.equipmentService.findById(this.id).subscribe(
      res => {
        let response = res;
        this.equipmentType = response.equipmentType        
        if(this.equipmentType === "COMPUTER") {
          this.equipmentType = "Computador";
          this.computer = response;
        }
        else if(this.equipmentType === "PRINTER") {
          this.equipmentType = "Impressora";
          this.printer = response;
        }
        else if(this.equipmentType === "MONITOR") {
          this.equipmentType = "Monitor";
          this.monitor = response;
        }        
        this.populateForm();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  populateForm() {
    if(this.equipmentType === "Computador"){
      this.formManufacturer = this.computer.manufacturer;
      this.formModel = this.computer.model;
      this.formDescription = this.computer.description;
      this.formItWorks = this.computer.itWorks;
      this.formPatrimonyId = this.computer.patrimonyId;
      this.formIpAddress = this.computer.ipAddress;
      this.formHostName = this.computer.hostName;
      this.formMotherBoardName = this.computer.motherBoardName;
      this.formHasCdBurner = this.computer.hasCdBurner;
      this.formCabinetModel = this.computer.cabinetModel;
      this.formOperatingSystem = this.computer.operatingSystem;
      this.formOperatingSystemArchitecture = this.computer.operatingSystemArchitecture;
      this.formOnTheDomain = this.computer.onTheDomain;
      if (this.computer.processor !== null)
        this.formProcessorId = this.computer.processor.id;
      if (this.computer.monitor !== null)
        this.formMonitorId = this.computer.monitor.id;
      this.formSectorId = this.computer.sector.id;
      /*
      this.formRamMemoriesId = number[];
      this.formStorageDevicesId = number[];
      this.formComputerUsersId = number[];
      */
    }
    else if(this.equipmentType === "Impressora") {
      this.formManufacturer = this.printer.manufacturer;
      this.formModel = this.printer.model;
      this.formDescription = this.printer.description;
      this.formItWorks = this.printer.itWorks;
      this.formPatrimonyId = this.printer.patrimonyId;
      this.formIpAddress = this.printer.ipAddress;
      this.formHostName = this.printer.hostName;
      this.formSectorId = this.printer.sector.id;
    }
    else if(this.equipmentType === "Monitor") {    
      this.formManufacturer = this.monitor.manufacturer;
      this.formModel = this.monitor.model;
      this.formDescription = this.monitor.description;
      this.formItWorks = this.monitor.itWorks;
      this.formPatrimonyId = this.monitor.patrimonyId;
      // this.formComputerId = this.monitor.computer;
      this.formSectorId = this.monitor.sector.id;
    }
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

  update() {
    
    if(this.equipmentType === "Computador"){
      let computer: ComputerNewDTO = {
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
        monitorId: this.formMonitorId,
        ramMemoriesId: this.formRamMemoriesId,
        storageDevicesId: this.formStorageDevicesId,
        computerUsersId: this.formComputerUsersId
      }

      this.computerService.update(this.id, computer).subscribe(
        res => {          
          this.successMessageAlert("Computador atualizado com sucesso");
          this.pageService.updateComputersList();
          this.pageService.redirectToRootPage();
        },
        error => {
          this.errorMessageAlert(error);
        }
      );
    }
    else if(this.equipmentType === "Impressora") {
      let printer: PrinterNewDTO = {
        manufacturer: this.formManufacturer,
        model: this.formModel,
        description: this.formDescription,
        itWorks: this.formItWorks,
        patrimonyId: this.formPatrimonyId,
        ipAddress: this.formIpAddress,
	      hostName: this.formHostName,
        sectorId: this.formSectorId,
        
      }
      this.printerService.update(this.id, printer).subscribe(
        res => {          
          this.successMessageAlert("Impressora atualizado com sucesso");
          this.cancel();
        },
        error => {
          this.errorMessageAlert(error);
        }
      );
    }
    else if(this.equipmentType === "Monitor") {      
      let monitor: MonitorNewDTO = {
        manufacturer: this.formManufacturer,
        model: this.formModel,
        description: this.formDescription,
        itWorks: this.formItWorks,
        patrimonyId: this.formPatrimonyId,
        sectorId: this.formSectorId,
	      computerId: null
      }
      this.monitorService.update(this.id, monitor).subscribe(
        res => {          
          this.successMessageAlert("Monitor atualizado com sucesso");
          this.cancel();
        },
        error => {
          this.errorMessageAlert(error);
        }
      );
    }
  }

  delete(){
    if(this.equipmentType === "Computador") {    
      this.computerService.delete(this.id).subscribe(
        res => {
          this.successMessageAlert("Computador excluído com sucesso");
          this.cancel();
        },
        error => {
          this.errorMessageAlert(error);
        }
      );
    }
    else if(this.equipmentType === "Impressora") {    
      this.printerService.delete(this.id).subscribe(
        res => {
          this.successMessageAlert("Impressora excluída com sucesso");
          this.cancel();
        },
        error => {
          this.errorMessageAlert(error);
        }
      );
    }
    else if(this.equipmentType === "Monitor") {    
      this.monitorService.delete(this.id).subscribe(
        res => {
          this.successMessageAlert("Monitor excluído com sucesso");
          this.cancel();
        },
        error => {
          this.errorMessageAlert(error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/equipments']);
  }

  async successMessageAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      //subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorMessageAlert(error: any) {
    let msg: any;
    if(error.error.error === undefined)
      msg = "Erro desconhecido";
    else
      msg = error.error.error;
    const alert = await this.alertController.create({
      header: 'Opps!',
      //subHeader: 'Subtitle',
      message: 'Parece que ocorreu um erro: ' + msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
