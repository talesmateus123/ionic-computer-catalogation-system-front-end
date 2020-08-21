import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { MonitorService, MonitorDTO } from '../../shared';
import { SearchMonitorModalPage } from './search/search-monitor-modal.page';

@Component({
  selector: 'app-monitors-modal',
  templateUrl: './monitors-modal.page.html',
  styleUrls: ['./monitors-modal.page.scss'],
})
export class MonitorsModalPage implements OnInit {
  private index: number
  public monitorsAlreadyEntered: MonitorDTO[];
  public monitors: MonitorDTO[];
  
  public searchTerm: string= "";
  public booleanSearchTerm: boolean = true;
  public asc: boolean = true;
  public orderBy: string = "patrimonyId";
  public equipmentType: string = "Computadores";
  public searchType: string = "DEFAULT";


  constructor(
    private modalController: ModalController,
    private monitorService: MonitorService
  ) { }

  ngOnInit() {
    this.updateMonitorsList();
  }

  returnDataAndDismiss(monitor: MonitorDTO) {
    this.modalController.dismiss(
      {
        index: this.index,
        monitor: monitor
      }
     );
  }

  dismiss() {
    this.modalController.dismiss();
  }

  private updateMonitorsList(): void {
    this.monitors = undefined;
    this.monitorService.findAll()
      .subscribe(response => {
        this.monitors = [];
        for(let i in response) {
          if(!this.contains(this.monitorsAlreadyEntered, response[i]))
            this.monitors.push(response[i]);
        }
      }, 
      error => {
        // this.errorMessageAlert(error);
      });
  }

  private contains(a: MonitorDTO[], obj: MonitorDTO) {
    var i = a.length;
    while (i--) {
      if(a[i] != undefined) {
        if (a[i].id === obj.id) {
          return true;
        }
      }
    }
    return false;
  }

  private searchMonitor(searchTerm: string, direction: string, orderBy: string) {
    this.monitors = undefined;
    this.monitorService.search(searchTerm, direction, orderBy)
      .subscribe(response => {
        this.monitors = response.body.content;
      },
      error => {
        //this.toastMessageControllerService.errorMessageAlert(error);
      });
  }

  async searchMonitorModalPresent() {
    const modal = await this.modalController.create({
      component: SearchMonitorModalPage,
      componentProps: { 
        searchTerm: this.searchTerm,
        booleanSearchTerm: this.booleanSearchTerm,
        asc: this.asc,
        orderBy: this.orderBy,
        searchType: this.searchType,
        equipmentType: this.equipmentType
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        this.searchTerm = dataReturned.data.searchTerm;
        this.booleanSearchTerm = dataReturned.data.booleanSearchTerm;
        this.asc = dataReturned.data.asc;
        this.orderBy = dataReturned.data.orderBy;
        this.searchType = dataReturned.data.searchType;

        this.searchMonitor(dataReturned.data.searchTerm, dataReturned.data.asc ? "ASC" : "DESC", dataReturned.data.orderBy);
      }
    });
    return await modal.present();
  }

}
