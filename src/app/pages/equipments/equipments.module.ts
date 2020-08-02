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
import { InfoElectronicComponentModalPage, ComputerUsersModalPage, SearchComputerUserModalPage } from './modals';
import { ComputerUserControllerService, ComputerUserService } from '../computer-users';

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
    InfoElectronicComponentModalPage,
    ComputerUsersModalPage,
    SearchComputerUserModalPage
  ],
  entryComponents: [
    InfoElectronicComponentModalPage,
    ComputerUsersModalPage,
    SearchComputerUserModalPage
  ],
  providers: [
    EquipmentControllerService,
    ElectronicService,
    ComputerService,
    MonitorService,
    PrinterService,
    NetworkDeviceService,
    SectorControllerService,
    SectorService,
    ComputerUserControllerService,
    ComputerUserService,
  ]
})
export class EquipmentsPageModule {}
