import { Component, OnInit } from '@angular/core';
import { ComputerUserControllerService } from '../shared';
import { SectorControllerService } from '../../sectors';

@Component({
  selector: 'app-new-computer-user',
  templateUrl: './new-computer-user.page.html',
  styleUrls: ['./new-computer-user.page.scss'],
})
export class NewComputerUserPage implements OnInit {
  private id: string;

  public formName: string;
	public formLastName: string;
	public formEmail: string;
	public formSectorId: number;
	public formUseTheComputersId: number[];

  constructor(
    public controller: ComputerUserControllerService,
    public sectorController: SectorControllerService) { }

  ngOnInit() {
    this.sectorController.updateSectorsList();
  }

  create() {
    this.controller.createComputerUser(
      {
        name: this.formName,
        lastName: this.formLastName,
        email: this.formEmail,
        sectorId: this.formSectorId,
        useTheComputersId: this.formUseTheComputersId
      }
    );
  }
}
