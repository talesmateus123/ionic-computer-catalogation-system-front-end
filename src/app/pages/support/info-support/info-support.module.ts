import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoSupportPageRoutingModule } from './info-support-routing.module';

import { InfoSupportPage } from './info-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoSupportPageRoutingModule
  ],
  declarations: [InfoSupportPage]
})
export class InfoSupportPageModule {}
