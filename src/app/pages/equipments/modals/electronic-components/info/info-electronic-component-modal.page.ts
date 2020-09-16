import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { ToastMessageControllerService } from '../../../../../shared-resources/services/toast-message-controller.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArchitectureType, RamMemoryArchitecture, StorageDeviceArchitecture, StorageDeviceType } from '../shared/models/enums';

@Component({
  selector: 'app-info-electronic-component-modal',
  templateUrl: './info-electronic-component-modal.page.html',
  styleUrls: ['./info-electronic-component-modal.page.scss'],
})
export class InfoElectronicComponentModalPage implements OnInit {
  form: FormGroup;

  public electronicComponentTypes: string[] = [
    'PROCESSOR',
    'RAM_MEMORY',
    'STORAGE_DEVICE',
  ];

  public keys = Object.keys;

  public processorArchitectures = ArchitectureType;
  public ramMemoryArchitectures = RamMemoryArchitecture;
  public storageDeviceArchitectures = StorageDeviceArchitecture;
  public storageDeviceTypes = StorageDeviceType;

  public electronicComponent: any;

  public formManufacturer: string;
  public formModel: string;
  public formDescription: string;
  public formProcessorName: string;
  public formArchitecture: string;
  public formSizeInGB: number;
  public formType: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageControllerService: ToastMessageControllerService,
    private modalController: ModalController,
    ) { }

  ngOnInit() {
    this.generateForm();
    this.populateForm();
  }

  private async populateForm() {
    this.form.get('manufacturer').setValue(this.electronicComponent.manufacturer);
    this.form.get('model').setValue(this.electronicComponent.model);
    this.form.get('description').setValue(this.electronicComponent.description);
    this.form.get('processorName').setValue(this.electronicComponent.processorName);
    this.form.get('architecture').setValue(this.electronicComponent.architecture);
    this.form.get('sizeInGB').setValue(this.electronicComponent.sizeInGB);
    this.form.get('type').setValue(this.electronicComponent.type);
  }

  generateForm() {
    this.form = this.formBuilder.group({
    manufacturer: ['', [  ]],
    model: ['', [  ]],
    description: ['', [ Validators.maxLength(100) ]],
    processorName: ['', this.electronicComponent.equipmentType === 'PROCESSOR' ? [ Validators.required ] : [  ] ],
    architecture: ['', [ Validators.required ]],
    sizeInGB: [0, this.electronicComponent.equipmentType === 'RAM_MEMORY' || this.electronicComponent.equipmentType === 'STORAGE_DEVICE' ?
       [ Validators.required, Validators.min(1) ] : [  ] ],
    type: [, this.electronicComponent.equipmentType === 'STORAGE_DEVICE' ? [ Validators.required ] : [  ] ],
    });
  }

  private presentFormErrorMessages() {
    let errorMessages: string = '';

    if (this.form.controls.description.errors) {
      if (this.form.controls.description.errors.maxlength) {
        errorMessages = errorMessages +
          '- O campo descrição deve ter no máximo ' +
          this.form.controls.description.errors.maxlength.requiredLength +
          ' caracteres. <br>';
      }
    }

    if (this.form.controls.processorName.errors) {
      if (this.form.controls.processorName.errors.required) {
        errorMessages = errorMessages + '- O campo número do processador é obrigatório. <br>';
      }
    }

    if (this.form.controls.sizeInGB.errors) {
      if (this.form.controls.sizeInGB.errors.min) {
        errorMessages = errorMessages +
          '- O campo tamanho deve ser no mínimo ' +
          this.form.controls.sizeInGB.errors.min.min +
          '. <br>';
      }
    }

    this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos', errorMessages);
  }

  returnDataAndDismiss() {
    if (this.form.invalid) {
      this.presentFormErrorMessages();
      return;
    }

    this.electronicComponent.manufacturer = this.form.get('manufacturer').value;
    this.electronicComponent.model = this.form.get('model').value;
    this.electronicComponent.description = this.form.get('description').value;
    this.electronicComponent.processorName = this.form.get('processorName').value;
    this.electronicComponent.architecture = this.form.get('architecture').value;
    this.electronicComponent.sizeInGB = this.form.get('sizeInGB').value;
    this.electronicComponent.type = this.form.get('type').value;

    this.modalController.dismiss(
      {
        electronicComponent: this.electronicComponent
      }
     );
  }

  dismiss() {
    this.modalController.dismiss();
  }

  eventHandler($keyCode) {
    if ($keyCode === 13) {
      this.returnDataAndDismiss();
    }
  }

}
