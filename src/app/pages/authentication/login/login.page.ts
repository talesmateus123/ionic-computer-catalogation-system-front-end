import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationControllerService, Login } from './shared';
import { ToastMessageControllerService } from 'src/app/shared-resources';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastMessageControllerService: ToastMessageControllerService,
    private controller: AuthenticationControllerService
  ) { }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.form = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(4) ]]
    });
  }

  private presentFormErrorMessages() {
    let errorMessages: string = '';
    if (this.form.controls.email.errors) {
      if (this.form.controls.email.errors.required) {
        errorMessages = errorMessages + '- O campo e-mail é obrigatório. <br>';
      }
      if (this.form.controls.email.errors.email) {
        errorMessages = errorMessages + '- E-mail inválido. <br>';
      }
    }

    if (this.form.controls.password.errors) {
      if (this.form.controls.password.errors.required) {
        errorMessages = errorMessages + '- O campo senha é obrigatório. <br>';
      }
    }
    this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos', errorMessages);
  }

  async login() {
    if (this.form.invalid) {
      this.presentFormErrorMessages();
      return;
    }

    const login: Login = this.form.value;

    await this.controller.login(login);
  }

  eventHandler($keyCode) {
    if ($keyCode === 13) {
      this.login();
    }
  }

}
