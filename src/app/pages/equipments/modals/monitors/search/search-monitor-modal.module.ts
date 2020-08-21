import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMonitorModalPageRoutingModule } from './search-monitor-modal-routing.module';

import { SearchMonitorModalPage } from './search-monitor-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMonitorModalPageRoutingModule
  ],
  declarations: [SearchMonitorModalPage]
})
export class SearchMonitorModalPageModule {}
