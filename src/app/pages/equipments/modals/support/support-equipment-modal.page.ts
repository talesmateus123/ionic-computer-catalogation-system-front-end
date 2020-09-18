import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-equipment-modal',
  templateUrl: './support-equipment-modal.page.html',
  styleUrls: ['./support-equipment-modal.page.scss'],
})
export class SupportEquipmentModalPage implements OnInit {
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
