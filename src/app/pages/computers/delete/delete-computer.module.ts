import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteComputerPageRoutingModule } from './delete-computer-routing.module';

import { DeleteComputerPage } from './delete-computer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteComputerPageRoutingModule
  ],
  declarations: [DeleteComputerPage]
})
export class DeleteComputerPageModule {}
