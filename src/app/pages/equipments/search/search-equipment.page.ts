import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-equipment',
  templateUrl: './search-equipment.page.html',
  styleUrls: ['./search-equipment.page.scss'],
})
export class SearchEquipmentPage implements OnInit {
  public searchTerm: string= "";
  public asc: boolean = true;
  public orderBy: string = "patrimonyId"
  
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async search() {
    await this.modalController.dismiss(
      {
        searchTerm: this.searchTerm, 
        direction: this.asc ? "ASC" : "DESC",
        orderBy: this.orderBy
      }
     );
  }

  dismiss() {
    this.modalController.dismiss();
  }
  
}
