import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SectorsPageRoutingModule } from './sectors-routing.module';
import { SectorsPage } from './sectors.page';
import { NewSectorPage } from './new';
import { UpdateSectorPage } from './update';
import { InfoSectorPage } from './info';
import { SectorService } from './shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    SectorsPageRoutingModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    SectorsPage,
    NewSectorPage,
    UpdateSectorPage,
    InfoSectorPage
  ],
  providers: [
    SectorService
  ]
})
export class SectorsPageModule {}
