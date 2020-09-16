import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-equipment-modal',
  templateUrl: './help-equipment-modal.page.html',
  styleUrls: ['./help-equipment-modal.page.scss'],
})
export class HelpEquipmentModalPage implements OnInit {
  public editForm: boolean;
  public teamViewerId: string;
  public teamViewerPass: string;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  returnDataAndDismiss() {
    this.modalController.dismiss(
      {
        teamViewerId: this.teamViewerId,
        teamViewerPass: this.teamViewerPass
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
