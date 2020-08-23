import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ComputerUserControllerService } from '../shared';
import { SectorControllerService } from '../../sectors';
import { LoadingModalControllerService } from 'src/app/shared-resources';
import { concat } from 'rxjs';

@Component({
  selector: 'app-info-computer-user',
  templateUrl: './info-computer-user.page.html',
  styleUrls: ['./info-computer-user.page.scss'],
})
export class InfoComputerUserPage implements OnInit {
  private id: string;
  public editForm: boolean

  public filledValues: boolean = false;

  public formName: string;
	public formLastName: string;
	public formEmail: string;
	public formSectorId: number;
  public formUseTheComputersId: number[];

  public computerUser: any;
  
  constructor(
    public controller: ComputerUserControllerService,
    public sectorController: SectorControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.editForm = true;
    this.initValues();
  }

  async initValues() {
    await this.loadingModalControllerService.loadingPresent();
    await this.sectorController.findAllSectors().toPromise().then((res) => {
      this.sectorController.sectors = res;
    });

    await this.controller.findComputerUser(this.id).toPromise().then(
      res => {
        this.computerUser = res;
        this.populateForm();
        this.filledValues = true;
        this.loadingModalControllerService.loadingDismiss();
      },
      error => {
        this.controller.redirectToRootPage();
      }
    );
  }
  
  setEditForm() {
    if (this.editForm)
      this.editForm = false;
    else
      this.editForm = true;
  }

  populateForm() {
    this.formName = this.computerUser.name;
    this.formLastName = this.computerUser.lastName;
    this.formEmail = this.computerUser.email;
    this.formSectorId = this.computerUser.sector.id;
    // this.formUseTheComputersId = this.computerUser.;
  }

  update() {    
    this.controller.updateComputerUser(this.id, 
      {
        name: this.formName,
        lastName: this.formLastName,
        email: this.formEmail,
        sectorId: this.formSectorId,
        useTheComputersId: this.formUseTheComputersId,
      }
    );
  }

  delete() {
      this.controller.deleteComputerUser(this.id);
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.update();
  }
}
