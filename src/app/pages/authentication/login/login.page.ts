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

  async login() {
    if (this.form.invalid) {
      this.toastMessageControllerService.errorMessageAlert('Os dados do formulário estão incorretos');
      return;
    }
    const login: Login = this.form.value;

    await this.controller.login(login);
  }

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.login();
  }

}
