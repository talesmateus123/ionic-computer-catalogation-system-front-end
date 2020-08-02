import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-equipment',
  templateUrl: './search-equipment.page.html',
  styleUrls: ['./search-equipment.page.scss'],
})
export class SearchEquipmentPage implements OnInit {
  public searchTerm: string;
  public asc: boolean;
  public orderBy: string;
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
        asc: this.asc,
        orderBy: this.orderBy
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
