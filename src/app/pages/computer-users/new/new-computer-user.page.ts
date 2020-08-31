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
      sector: ['', [ Validators.required ]],
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

  create() {
    if (this.form.invalid) {
      this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos');
      return;
    }

    this.controller.createComputerUser(
      {
        name: this.form.get('name').value,
        lastName: this.form.get('lastName').value,
        email: this.form.get('email').value,
        sectorId: this.form.get('sector').value
      }
    );
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.create();
  }
}
