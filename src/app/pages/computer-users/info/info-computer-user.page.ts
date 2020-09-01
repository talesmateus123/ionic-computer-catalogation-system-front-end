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

  private presentFormErrorMessages() {
    let errorMessages: string = '';
    if (this.form.controls.name.errors) {
      if (this.form.controls.name.errors.required) {
        errorMessages = errorMessages + '- O campo nome é obrigatório. <br>';
      }
      if (this.form.controls.name.errors.minlength) {
        errorMessages = errorMessages +
          '- O campo nome deve ter no mínimo ' +
          this.form.controls.name.errors.minlength.requiredLength +
          ' caracteres. <br>';
      }
      if (this.form.controls.name.errors.maxlength) {
        errorMessages = errorMessages +
          '- O campo nome deve ter no máximo ' +
          this.form.controls.name.errors.maxlength.requiredLength +
          ' caracteres. <br>';
      }
    }

    if (this.form.controls.lastName.errors) {
      if (this.form.controls.lastName.errors.minlength) {
        errorMessages = errorMessages +
          '- O campo sobrenome deve ter no mínimo ' +
          this.form.controls.lastName.errors.minlength.requiredLength +
          ' caracteres. <br>';
      }
      if (this.form.controls.lastName.errors.maxlength) {
        errorMessages = errorMessages +
          '- O campo sobrenome deve ter no máximo ' +
          this.form.controls.lastName.errors.maxlength.requiredLength +
          ' caracteres. <br>';
      }
    }

    if (this.form.controls.email.errors) {
      if (this.form.controls.email.errors.email) {
        errorMessages = errorMessages + '- E-mail inválido. <br>';
      }
    }

    this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos', errorMessages);
  }

  update() {
    if (this.form.invalid) {
      this.presentFormErrorMessages();
      return;
    }

    this.controller.updateComputerUser(this.id,
      {
        name: this.form.get('name').value,
        lastName: this.form.get('lastName').value,
        email: this.form.get('email').value,
        sectorId: this.form.get('sectorId').value
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
