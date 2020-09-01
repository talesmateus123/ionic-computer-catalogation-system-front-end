import { Component, OnInit } from '@angular/core';
import { AuthUtilService } from '../shared-resources';
import { ToastMessageControllerService, LoadingModalControllerService } from 'src/app/shared-resources';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageControllerService: ToastMessageControllerService,
    private loadingModalControllerService: LoadingModalControllerService,
    private service: AuthUtilService
  ) { }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.form = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]]
    });
  }

  private presentFormErrorMessages() {
    let errorMessages: string = '';
    if (this.form.controls.email.errors.required) {
      errorMessages = errorMessages + '- O campo e-mail é obrigatório. <br>';
    }
    if (this.form.controls.email.errors.email) {
      errorMessages = errorMessages + '- E-mail inválido. <br>';
    }
    this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos', errorMessages);
  }

  async forgotPassword() {
    if (this.form.invalid) {
      this.presentFormErrorMessages();
      return;
    }

    await this.loadingModalControllerService.loadingPresent('Processando...');
    this.service.forgotPassword({email: this.form.get('email').value})
      .subscribe(response => {
        this.loadingModalControllerService.loadingDismiss();
        this.toastMessageControllerService.successMessageAlert(
          `Um e-mail com sua nova senha foi enviado para ${this.form.get('email').value}`
        );
      },
      error => {

      });
  }

  eventHandler($keyCode) {
    if ($keyCode === 13) {
      this.forgotPassword();
    }
  }

}
