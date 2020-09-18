import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ComputerUsersPageRoutingModule } from './computer-users-routing.module';
import { ComputerUsersPage } from './computer-users.page';
import { NewComputerUserPage } from './new';
import { InfoComputerUserPage } from './info';
import { ComputerUserControllerService, ComputerUserService } from './shared';
import { SectorControllerService, SectorService } from '../sectors';
import { SearchComputerUserPage } from './search';
import { AuthInterceptorProvider } from 'src/app/interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from 'src/app/interceptors/error-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ComputerUsersPageRoutingModule
  ],
  declarations: [
    ComputerUsersPage,
    NewComputerUserPage,
    InfoComputerUserPage,
    SearchComputerUserPage
  ],
  providers: [
    ComputerUserControllerService,
    ComputerUserService,
    SectorControllerService,
    SectorService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class ComputerUsersPageModule {}
