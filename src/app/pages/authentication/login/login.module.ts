import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AuthenticationService, AuthenticationControllerService} from './shared';
import { ErrorInterceptorProvider } from 'src/app/interceptors/error-interceptor';
import { AuthInterceptorProvider } from 'src/app/interceptors/auth-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginPageRoutingModule,
  ],
  declarations: [
    LoginPage
  ],
  providers: [
    FormBuilder,
    AuthenticationService,
    AuthenticationControllerService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class LoginPageModule {}
