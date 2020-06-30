import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { EquipmentsPageRoutingModule } from './equipments-routing.module';
import { EquipmentsPage } from './equipments.page';
import { NewEquipmentPage } from './new/new-equipment.page';
import { InfoEquipmentPage } from './info/info-equipment.page';
import { ComputerService, MonitorService, PrinterService, EquipmentControllerService } from './shared';
import { ElectronicService } from '../shared-resources';
import { SectorControllerService, SectorService } from '../sectors';
import { ElectronicComponentControllerService, ProcessorService, RamMemoryService, StorageDeviceService } from './electronic-components/shared';
import { ElectronicComponentsPage } from './electronic-components';

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
    EquipmentControllerService,
    ElectronicService,
    ComputerService,
    MonitorService,
    PrinterService,
    SectorControllerService,
    SectorService,
    ElectronicComponentControllerService,
    ProcessorService,
    RamMemoryService,
    StorageDeviceService
  ]
})
export class EquipmentsPageModule {}
