import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ComputerDTO, PrinterDTO, MonitorDTO, ComputerNewDTO, PrinterNewDTO, MonitorNewDTO, EquipmentDTO } from '../models';
import { SectorDTO } from 'src/app/models/sector.dto';
import { EquipmentService } from './equipment.service';
import { ComputerService } from './computer.service';
import { MonitorService } from './monitor.service';
import { PrinterService } from './printer.service';
import { SectorService } from 'src/app/pages/sectors';
import { ProcessorDTO } from 'src/app/pages/electronic-components/shared/models/processor.dto';
import { RamMemoryDTO } from 'src/app/pages/electronic-components/shared/models/ram_memory.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentControllerService {
  public sectors: SectorDTO[];
  public computers: ComputerDTO[];
  public monitors: MonitorDTO[];
  public printers: PrinterDTO[];
  public availableComputers: ComputerDTO[];
  public availableMonitors: MonitorDTO[];
  public availableProcessors: ProcessorDTO[];
  public availableRamMemories: RamMemoryDTO[];

  constructor(
    public alertController: AlertController, 
    private router: Router, 
    private equipmentService: EquipmentService, 
    private computerService: ComputerService,
    private monitorService: MonitorService,
    private printerService: PrinterService, 
    private sectorService: SectorService) { }

  findEquipment(id: string): Observable<EquipmentDTO> {
    return this.equipmentService.findById(id);
  }

  updateComputersList(): void {
    this.computerService.findAll()
      .subscribe(response => {
        this.computers = response;
      }, 
      error => {
        console.log(error);
      });
  }

  updatePrintersList(): void {
    this.printerService.findAll()
      .subscribe(response => {
        this.printers = response;
      }, 
      error => {
        console.log(error);
      });
  }

  updateMonitorsList(): void {
    this.monitorService.findAll()
      .subscribe(response => {
        this.monitors = response;
      }, 
      error => {
        console.log(error);
      });
  }

  populateSectors(): void {
    this.sectorService.findAll()
      .subscribe(response => {
        this.sectors = response;
      }, 
      error => {
        console.log(error);
      });
  }

  populateAvailableComputers(): void {
    this.computerService.findAvailable()
      .subscribe(response => {
        this.availableComputers = response;
      }, 
      error => {
        console.log(error);
      });
  }

  populateAvailableMonitors(): void {
    this.monitorService.findAvailable()
      .subscribe(response => {
        this.availableMonitors = response;
      }, 
      error => {
        console.log(error);
      });
  }

  createComputer(objetcNewDTO: ComputerNewDTO) {
    this.computerService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Computador criado com sucesso");
      this.updateComputersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  createPrinter(objetcNewDTO: PrinterNewDTO) {
    this.printerService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Impressora criada com sucesso");
      this.updatePrintersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  createMonitor(objetcNewDTO: MonitorNewDTO) {
    this.monitorService.create(objetcNewDTO).subscribe(res => {
      this.successMessageAlert("Monitor criado com sucesso");
      this.updateMonitorsList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  updateComputer(id: string, object: ComputerNewDTO): void {
    this.computerService.update(id, object).subscribe(res => {
      this.successMessageAlert("Computador atualizado com sucesso");
      this.updateComputersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }
  
  updatePrinter(id: string, object: PrinterNewDTO): void {
    this.printerService.update(id, object).subscribe(res => {
      this.successMessageAlert("Impressora atualizada com sucesso");
      this.updatePrintersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  updateMonitor(id: string, object: MonitorNewDTO): void {
    this.monitorService.update(id, object).subscribe(res => {
      this.successMessageAlert("Monitor atualizada com sucesso");
      this.updateMonitorsList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  deleteComputer(id: string): void {
    this.computerService.delete(id).subscribe(res => {
      this.successMessageAlert("Computador excluído com sucesso");
      this.updateComputersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  deletePrinter(id: string): void {
    this.printerService.delete(id).subscribe(res => {
      this.successMessageAlert("Impressora excluída com sucesso");
      this.updatePrintersList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  deleteMonitor(id: string): void {
    this.monitorService.delete(id).subscribe(res => {
      this.successMessageAlert("Monitor excluído com sucesso");
      this.updateMonitorsList();
      this.redirectToRootPage();
    }, 
    error => {
      this.errorMessageAlert(error);
    });
  }

  redirectToRootPage(): void {
    this.router.navigate(['equipments']);
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
    if (error.error.error === undefined)
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
