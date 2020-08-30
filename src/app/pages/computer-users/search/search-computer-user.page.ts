import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-computer-user',
  templateUrl: './search-computer-user.page.html',
  styleUrls: ['./search-computer-user.page.scss'],
})
export class SearchComputerUserPage implements OnInit {
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
    if ($keyCode === 13)
      this.returnDataAndDismiss();
  }
}
