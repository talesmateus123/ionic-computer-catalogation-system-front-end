import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthUtilService } from '../shared-resources';
import { ToastMessageControllerService, LoadingModalControllerService } from 'src/app/shared-resources';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public email: string;

  constructor(
    private menuController: MenuController,
    private loadingModalControllerService: LoadingModalControllerService,
    private toastMessageControllerService: ToastMessageControllerService,
    private service: AuthUtilService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  async forgotPassword() {
    await this.loadingModalControllerService.loadingPresent('Processando...');
    this.service.forgotPassword({email: this.email})
      .subscribe(response => {
        this.loadingModalControllerService.loadingDismiss();
        this.toastMessageControllerService.successMessageAlert(`Um e-mail com sua nova senha foi enviado para ${this.email}`);
      },
      error => {
        
      });
  }

}
