import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-monitor-modal',
  templateUrl: './search-monitor-modal.page.html',
  styleUrls: ['./search-monitor-modal.page.scss'],
})
export class SearchMonitorModalPage implements OnInit {
  public searchTerm: string;
  public booleanSearchTerm: string;
  public asc: boolean;
  public orderBy: string;
  public searchType: string;
  public equipmentType: string;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  returnDataAndDismiss() {
    this.modalController.dismiss(
      {
        searchTerm: this.searchTerm, 
        booleanSearchTerm: this.booleanSearchTerm,
        asc: this.asc,
        orderBy: this.orderBy,
        searchType: this.searchType
      }
     );
  }

  dismiss() {
    this.modalController.dismiss();
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.returnDataAndDismiss();
  }

}
