import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { EquipmentsPageRoutingModule } from './equipments-routing.module';

import { EquipmentsPage } from './equipments.page';
import { NewEquipmentPage } from './new/new-equipment.page';
import { InfoEquipmentPage } from './info/info-equipment.page';
import { ComputerService, MonitorService, PrinterService } from './shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    EquipmentsPageRoutingModule
  ],
  declarations: [
    EquipmentsPage,
    NewEquipmentPage,
    InfoEquipmentPage
  ],
  providers: [
    ComputerService,
    MonitorService,
    PrinterService
  ]
})
export class EquipmentsPageModule {}
