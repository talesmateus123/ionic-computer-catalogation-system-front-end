import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ComputerUserControllerService } from '../shared';
import { SectorControllerService } from '../../sectors';

@Component({
  selector: 'app-info-computer-user',
  templateUrl: './info-computer-user.page.html',
  styleUrls: ['./info-computer-user.page.scss'],
})
export class InfoComputerUserPage implements OnInit {
  private id: string;
  public editForm: boolean

  public formName: string;
	public formLastName: string;
	public formEmail: string;
	public formSectorId: number;
  public formUseTheComputersId: number[];

  public computerUser: any;
  
  constructor(
    public controller: ComputerUserControllerService,
    public sectorController: SectorControllerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.controller.loadingPresent();
    this.id = this.route.snapshot.paramMap.get('id')
    this.sectorController.updateSectorsList();
    this.controller.findComputerUser(this.id).subscribe(
      res => {
        this.computerUser = res;
        this.populateForm();
        this.controller.loadingDismiss();
      },
      error => {
        this.controller.errorMessageAlert(error);
        this.controller.redirectToRootPage();
      }
    );
    this.editForm = true;
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
