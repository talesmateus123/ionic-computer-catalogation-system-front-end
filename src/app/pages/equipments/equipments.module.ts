import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { EquipmentsPageRoutingModule } from './equipments-routing.module';
import { EquipmentsPage } from './equipments.page';
import { NewEquipmentPage } from './new';
import { InfoEquipmentPage } from './info';
import { ComputerService, MonitorService, PrinterService, NetworkDeviceService, EquipmentControllerService } from './shared';
import { ElectronicService } from '../shared-resources';
import { SectorControllerService, SectorService } from '../sectors';
import { SearchEquipmentPage } from './search';
import { InfoElectronicComponentModalPage } from './modals';

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
    InfoEquipmentPage,
    SearchEquipmentPage,
    InfoElectronicComponentModalPage
  ],
  entryComponents: [
    InfoElectronicComponentModalPage  
  ],
  providers: [
    EquipmentControllerService,
    ElectronicService,
    ComputerService,
    MonitorService,
    PrinterService,
    NetworkDeviceService,
    SectorControllerService,
    SectorService
  ]
})
export class EquipmentsPageModule {}
