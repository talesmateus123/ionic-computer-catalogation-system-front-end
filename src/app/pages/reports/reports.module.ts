import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import { ReportControllerService, ReportService } from './shared';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ReportsPageRoutingModule
  ],
  declarations: [
    ReportsPage
  ],
  providers: [
    ReportControllerService,
    ReportService
  ]
})
export class ReportsPageModule {}
