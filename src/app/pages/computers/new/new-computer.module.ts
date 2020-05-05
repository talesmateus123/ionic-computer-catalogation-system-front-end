import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewComputerPageRoutingModule } from './new-computer-routing.module';

import { NewComputerPage } from './new-computer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewComputerPageRoutingModule
  ],
  declarations: [NewComputerPage]
})
export class NewComputerPageModule {}
