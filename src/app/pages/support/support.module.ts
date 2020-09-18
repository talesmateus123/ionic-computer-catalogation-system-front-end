import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportPageRoutingModule } from './support-routing.module';

import { SupportPage } from './support.page';
import { InfoSupportPage } from './info';
import { SearchSupportModalPage } from './modals';
import { SupportControllerService, SupportInfoService } from './shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportPageRoutingModule
  ],
  declarations: [
    SupportPage,
    InfoSupportPage,
    SearchSupportModalPage
  ],
  providers: [
    SupportControllerService,
    SupportInfoService
  ]
})
export class SupportPageModule {}
