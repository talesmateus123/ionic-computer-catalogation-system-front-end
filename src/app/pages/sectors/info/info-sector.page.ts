import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastMessageControllerService, LoadingModalControllerService } from 'src/app/shared-resources';
import { SectorNewDTO } from '../shared/';
import { SectorControllerService } from '../shared';

@Component({
  selector: 'app-info-sector',
  templateUrl: './info-sector.page.html',
  styleUrls: ['./info-sector.page.scss'],
})
export class InfoSectorPage implements OnInit {
  form: FormGroup;

  private id: string;

  public filledValues: boolean = false;

  public sector: SectorNewDTO;

  public editForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageControllerService: ToastMessageControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    private route: ActivatedRoute,
    private controller: SectorControllerService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.generateForm();
    this.initValues();
  }

  generateForm() {
    this.form = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(30) ]],
      phone: ['', [ Validators.pattern('(\\(\\d{2}\\)\\s)(\\d{4,5}\\-\\d{4})') ]]
    });
  }

  async initValues() {
    await this.loadingModalControllerService.loadingPresent();
    this.controller.findSector(this.id)
      .subscribe(
        res => {
          this.sector = res;
          this.populateForm();
          this.filledValues = true;
          this.loadingModalControllerService.loadingDismiss();
        },
        error => {
          this.controller.redirectToRootPage();
        });
  }

  setEditForm() {
    this.editForm = !this.editForm;
  }

  populateForm() {
    this.form.get('name').setValue(this.sector.name);
    this.form.get('phone').setValue(this.sector.phone);
  }

  update() {
    if (this.form.invalid) {
      this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos');
      return;
    }
    this.controller.updateSector(this.id,
      {
        name: this.form.get('name').value,
        phone: this.form.get('phone').value
      }
    );
  }

  delete() {
    this.controller.deleteSector(this.id);
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.update();
  }
}
