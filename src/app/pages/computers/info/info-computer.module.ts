import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoComputerPageRoutingModule } from './info-computer-routing.module';

import { InfoComputerPage } from './info-computer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoComputerPageRoutingModule
  ],
  declarations: [InfoComputerPage]
})
export class InfoComputerPageModule {}
