import { Component, OnInit } from '@angular/core';
import { ComputerUserControllerService } from '../shared';
import { SectorControllerService } from '../../sectors';
import { LoadingModalControllerService } from 'src/app/shared-resources';

@Component({
  selector: 'app-new-computer-user',
  templateUrl: './new-computer-user.page.html',
  styleUrls: ['./new-computer-user.page.scss'],
})
export class NewComputerUserPage implements OnInit {
  private id: string;

  public filledValues: boolean = false;
  
  public formName: string;
	public formLastName: string;
	public formEmail: string;
	public formSectorId: number;
	public formUseTheComputersId: number[];

  constructor(
    public controller: ComputerUserControllerService,
    public sectorController: SectorControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    ) { }

  ngOnInit() {
    this.initValues();
  }

  async initValues() {
    await this.loadingModalControllerService.loadingPresent();
    this.sectorController.findAllSectors().toPromise().then((res) => {
      this.sectorController.sectors = res;
      this.filledValues = true;
      this.loadingModalControllerService.loadingDismiss();
    });
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

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.create();
  }
}
