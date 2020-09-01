import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import { ToastMessageControllerService } from 'src/app/shared-resources';
import { AuthUtilService } from '../shared-resources';
import { ErrorInterceptorProvider } from 'src/app/interceptors/error-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule
  ],
  declarations: [
    ForgotPasswordPage
  ],
  providers: [
    ToastMessageControllerService,
    AuthUtilService,
    ErrorInterceptorProvider
  ]
})
export class ForgotPasswordPageModule {}
