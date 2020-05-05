import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateComputerPageRoutingModule } from './update-computer-routing.module';

import { UpdateComputerPage } from './update-computer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateComputerPageRoutingModule
  ],
  declarations: [UpdateComputerPage]
})
export class UpdateComputerPageModule {}
