import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ComputerUsersPageRoutingModule } from './computer-users-routing.module';
import { ComputerUsersPage } from './computer-users.page';
import { NewComputerUserPage } from './new';
import { InfoComputerUserPage } from './info';
import { ComputerUserControllerService, ComputerUserService } from './shared';
import { SectorControllerService, SectorService } from '../sectors';
import { SearchComputerUserPage } from './search';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
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
    SectorService
  ]  
})
export class ComputerUsersPageModule {}
