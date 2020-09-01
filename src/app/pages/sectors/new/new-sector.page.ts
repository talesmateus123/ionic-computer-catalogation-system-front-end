import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastMessageControllerService } from './../../../shared-resources/services/toast-message-controller.service';
import { SectorNewDTO, SectorControllerService } from '../shared';

@Component({
  selector: 'app-new-sector',
  templateUrl: './new-sector.page.html',
  styleUrls: ['./new-sector.page.scss'],
})
export class NewSectorPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageControllerService: ToastMessageControllerService,
    private controller: SectorControllerService
  ) { }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.form = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(30) ]],
      phone: ['', [ Validators.pattern('(\\(\\d{2}\\)\\s)(\\d{4,5}\\-\\d{4})') ]]
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

    if (this.form.controls.phone.errors) {
      if (this.form.controls.phone.errors.pattern) {
        errorMessages = errorMessages + '- Telefone inválido, deve coincidir com \"12) 1234-5678\". <br>';
      }
    }

    this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos', errorMessages);
  }

  create() {
    if (this.form.invalid) {
      this.presentFormErrorMessages();
      return;
    }
    
    this.controller.createSector({
      name: this.form.get('name').value,
      phone: this.form.get('phone').value
    });
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.create();
  }
}
