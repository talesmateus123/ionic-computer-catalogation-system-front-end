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

  create() {
    if (this.form.invalid) {
      this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos');
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
