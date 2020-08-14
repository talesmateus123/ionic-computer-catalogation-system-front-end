import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { EquipmentsPageRoutingModule } from './equipments-routing.module';
import { EquipmentsPage } from './equipments.page';
import { NewEquipmentPage, InfoEquipmentPage, ElectronicComponentControllerService, ProcessorService, RamMemoryService, StorageDeviceService } from './pages';
import { ComputerService, MonitorService, PrinterService, NetworkDeviceService, EquipmentControllerService } from './shared';
import { ElectronicService } from '../shared-resources';
import { SectorControllerService, SectorService } from '../sectors';
import { SearchEquipmentModalPage, InfoElectronicComponentModalPage, ComputerUsersModalPage, SearchComputerUserModalPage  } from './modals';
import { ComputerUserService } from '../computer-users';
import { AuthInterceptorProvider } from 'src/app/interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from 'src/app/interceptors/error-interceptor';

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
    SearchEquipmentModalPage,
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
    ElectronicComponentControllerService,
    ProcessorService,
    RamMemoryService,
    StorageDeviceService,
    ComputerUserService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class EquipmentsPageModule {}
