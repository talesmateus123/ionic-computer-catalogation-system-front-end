import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EquipmentsPageRoutingModule } from './equipments-routing.module';
import { EquipmentsPage } from './equipments.page';
import { NewEquipmentPage } from './new/new-equipment.page';
import { InfoEquipmentPage } from './info/info-equipment.page';
import { ComputerService, MonitorService, PrinterService, EquipmentService } from './shared';
import { SectorService } from '../sectors/shared';

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
    EquipmentService,
    ComputerService,
    MonitorService,
    PrinterService,
    SectorService
  ]
})
export class EquipmentsPageModule {}
