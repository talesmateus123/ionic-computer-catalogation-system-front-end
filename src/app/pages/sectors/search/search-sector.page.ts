import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-sector',
  templateUrl: './search-sector.page.html',
  styleUrls: ['./search-sector.page.scss'],
})
export class SearchSectorPage implements OnInit {
  public searchTerm: string;
  public asc: boolean = true;
  public orderBy: string = "name"
  
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
