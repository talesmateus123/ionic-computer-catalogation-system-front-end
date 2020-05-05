import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComputersPageRoutingModule } from './computers-routing.module';

import { ComputersPage } from './computers.page';
import { ComputerService } from './domain';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ComputersPageRoutingModule
  ],
  providers: [
    ComputerService
  ],
  declarations: [ComputersPage]
})
export class ComputersPageModule {}
