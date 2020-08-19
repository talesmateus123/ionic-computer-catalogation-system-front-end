import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationControllerService, User, Login } from './shared';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private controller: AuthenticationControllerService,
    private menuController: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
    this.generateForm();
    
    if(this.controller.isLoggedIn()){
      this.redirectToEquipmentsPage();
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }

  generateForm() {
    this.form = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(4) ]]
    });
  }

  login() {
    if(this.form.invalid) {
      this.controller.errorMessageAlert("Os dados do formulário estão incorretos");
      return;
    }
    const login: Login = this.form.value;
    this.controller.login(login);
  }

  private redirectToEquipmentsPage(): void {
    this.router.navigate(['login']);
}

  eventHandler($keyCode) {
    if ($keyCode === 13)
      this.login();
  }

}
