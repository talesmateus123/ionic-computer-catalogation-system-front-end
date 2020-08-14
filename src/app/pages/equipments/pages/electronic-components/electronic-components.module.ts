import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ElectronicComponentsPageRoutingModule } from './electronic-components-routing.module';
import { ElectronicComponentsPage } from './electronic-components.page';
import { NewElectronicComponentPage } from './new';
import { InfoElectronicComponentPage } from './info';
import { ElectronicComponentControllerService, RamMemoryService, StorageDeviceService, ProcessorService } from './shared';
import { ElectronicService } from 'src/app/pages/shared-resources';
import { SearchElectronicComponentPage } from './search/search-electronic-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    ElectronicComponentsPageRoutingModule
  ],
  declarations: [
    ElectronicComponentsPage,
    NewElectronicComponentPage,
    InfoElectronicComponentPage,
    SearchElectronicComponentPage
  ],
  providers: [
    ElectronicComponentControllerService,
    ElectronicService,
    ProcessorService,
    RamMemoryService,
    StorageDeviceService
  ]
})
export class ElectronicComponentsPageModule {}
