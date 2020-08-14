import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AuthenticationService, AuthenticationControllerService} from './shared';
import { SessionManagerService } from './shared/services/session-manager.service';
import { ErrorInterceptorProvider } from 'src/app/interceptors/error-interceptor';

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
    SessionManagerService,
    AuthenticationService,
    AuthenticationControllerService,
    ErrorInterceptorProvider
  ]
})
export class LoginPageModule {}
