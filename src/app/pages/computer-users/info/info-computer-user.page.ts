import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastMessageControllerService, LoadingModalControllerService } from 'src/app/shared-resources';
import { ComputerUserControllerService } from '../shared';
import { SectorControllerService } from '../../sectors';

@Component({
  selector: 'app-info-computer-user',
  templateUrl: './info-computer-user.page.html',
  styleUrls: ['./info-computer-user.page.scss'],
})
export class InfoComputerUserPage implements OnInit {
  form: FormGroup;

  private id: string;
  public editForm: boolean = true;

  public filledValues: boolean = false;

  public computerUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageControllerService: ToastMessageControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    public controller: ComputerUserControllerService,
    public sectorController: SectorControllerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.generateForm();
    this.initValues();
  }

  generateForm() {
    this.form = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(20) ]],
      lastName: ['', [ Validators.minLength(4), Validators.maxLength(20) ]],
      email: ['', [ Validators.email ]],
      sectorId: ['', [ Validators.required ]],
    });
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
    this.editForm = !this.editForm;
  }

  populateForm() {
    this.form.get('name').setValue(this.computerUser.name);
    this.form.get('lastName').setValue(this.computerUser.lastName);
    this.form.get('email').setValue(this.computerUser.email);
    this.form.get('sectorId').setValue(this.computerUser.sector.id);
  }

  update() {
    if (this.form.invalid) {
      this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos');
      return;
    }

    this.controller.updateComputerUser(this.id,
      {
        name: this.form.get('name').value,
        lastName: this.form.get('lastName').value,
        email: this.form.get('email').value,
        sectorId: this.form.get('sector').value
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
