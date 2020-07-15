import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SectorsPageRoutingModule } from './sectors-routing.module';
import { SectorsPage } from './sectors.page';
import { NewSectorPage } from './new';
import { InfoSectorPage } from './info';
import { SearchSectorPage } from './search';
import { SectorService, SectorControllerService } from './shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    SectorsPageRoutingModule,
    RouterModule,
  ],
  declarations: [
    SectorsPage,
    NewSectorPage,
    InfoSectorPage,
    SearchSectorPage
  ],
  providers: [
    SectorControllerService,
    SectorService
  ]
})
export class SectorsPageModule {}
