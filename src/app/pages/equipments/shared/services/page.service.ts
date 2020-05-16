import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { ComputerDTO, PrinterDTO, MonitorDTO, EquipmentDTO, ComputerNewDTO, PrinterNewDTO, MonitorNewDTO } from '../models';
import { SectorDTO } from 'src/app/models/sector.dto';
import { EquipmentService } from './equipment.service';
import { ComputerService } from './computer.service';
import { MonitorService } from './monitor.service';
import { PrinterService } from './printer.service';
import { SectorService } from 'src/app/pages/sectors';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public sectors: SectorDTO[];
  public computers: ComputerDTO[];
  public monitors: MonitorDTO[];
  public printers: PrinterDTO[];
  public availableComputers: ComputerDTO[];
  public availableMonitors: MonitorDTO[];
  
  constructor(
    public alertController: AlertController,
    private router: Router,
    private equipmentService: EquipmentService,
    private computerService: ComputerService,
    private monitorService: MonitorService,
    private printerService: PrinterService,
    private sectorService: SectorService) { }

  ngOnInit(): void {
    this.populateSectors();
    this.populateAvailableComputers();
    this.populateAvailableMonitors();
  }

  findEquipment(id: string): any {
    this.equipmentService.findById(id).subscribe(
      res => {
        console.log(res);
        return res;
      },
      error => {
        this.errorMessageAlert(error);
        return null;
      }
    );
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

  updateComputer(id: string, object: ComputerNewDTO): void {
    this.computerService.update(id, object).subscribe(
      res => {          
        this.successMessageAlert("Computador atualizado com sucesso");
        this.redirectToRootPage();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  updatePrinter(id: string, object: PrinterNewDTO): void {
    this.printerService.update(id, object).subscribe(
      res => {
        this.successMessageAlert("Impressora atualizada com sucesso");
        this.redirectToRootPage();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  updateMonitor(id: string, object: MonitorNewDTO): void {
    this.monitorService.update(id, object).subscribe(
      res => {          
        this.successMessageAlert("Monitor atualizada com sucesso");
        this.redirectToRootPage();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  deleteComputer(id: string): void {
    this.computerService.delete(id).subscribe(
      res => {
        this.successMessageAlert("Computador excluído com sucesso");
        this.redirectToRootPage();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  deletePrinter(id: string): void {
    this.printerService.delete(id).subscribe(
      res => {
        this.successMessageAlert("Impressora excluída com sucesso");
        this.redirectToRootPage();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  deleteMonitor(id: string): void {
    this.monitorService.delete(id).subscribe(
      res => {
        this.successMessageAlert("Monitor excluído com sucesso");
        this.redirectToRootPage();
      },
      error => {
        this.errorMessageAlert(error);
      }
    );
  }

  redirectToRootPage(): void {
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
