import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastMessageControllerService, LoadingModalControllerService } from 'src/app/shared-resources';
import { ComputerUserControllerService } from '../shared';
import { SectorControllerService } from '../../sectors';

@Component({
  selector: 'app-new-computer-user',
  templateUrl: './new-computer-user.page.html',
  styleUrls: ['./new-computer-user.page.scss'],
})
export class NewComputerUserPage implements OnInit {
  form: FormGroup;
  public filledValues: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageControllerService: ToastMessageControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    public controller: ComputerUserControllerService,
    public sectorController: SectorControllerService,
    ) { }

  ngOnInit() {
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
      this.filledValues = true;
      this.loadingModalControllerService.loadingDismiss();
    });
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

    if (this.form.controls.sectorId.errors) {
      if (this.form.controls.sectorId.errors.required) {
        errorMessages = errorMessages + '- O campo setor é obrigatório. <br>';
      }
    }

    this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos', errorMessages);
  }

  create() {
    if (this.form.invalid) {
      this.presentFormErrorMessages();
      return;
    }

    this.controller.createComputerUser(
      {
        name: this.form.get('name').value,
        lastName: this.form.get('lastName').value,
        email: this.form.get('email').value,
        sectorId: this.form.get('sectorId').value
      }
    );
  }

  eventHandler($keyCode) {
    if ($keyCode === 13) {
      this.create();
    }
  }
}
