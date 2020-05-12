import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ComputerUsersPageRoutingModule } from './computer-users-routing.module';
import { ComputerUsersPage } from './computer-users.page';
import { NewComputerUserPage } from './new';
import { InfoComputerUserPage } from './info';

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
    InfoComputerUserPage  
  ]
})
export class ComputerUsersPageModule {}
