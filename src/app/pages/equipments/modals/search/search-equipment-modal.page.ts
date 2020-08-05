import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-equipment-modal',
  templateUrl: './search-equipment-modal.page.html',
  styleUrls: ['./search-equipment-modal.page.scss'],
})
export class SearchEquipmentModalPage implements OnInit {
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
    if (this.equipmentType !== "Computadores")
      this.orderBy = "patrimonyId"
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
