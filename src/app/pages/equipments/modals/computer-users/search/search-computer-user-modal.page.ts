import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-computer-user-modal',
  templateUrl: './search-computer-user-modal.page.html',
  styleUrls: ['./search-computer-user-modal.page.scss'],
})
export class SearchComputerUserModalPage implements OnInit {
  public searchTerm: string;
  public asc: boolean;
  public orderBy: string;
  
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
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
    if ($keyCode === 13) {
      this.returnDataAndDismiss();
    }
  }
}
