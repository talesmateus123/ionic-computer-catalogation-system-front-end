import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SectorsPageRoutingModule } from './sectors-routing.module';
import { SectorsPage } from './sectors.page';
import { NewSectorPage } from './new';
import { InfoSectorPage } from './info';
import { SearchSectorPage } from './search';
import { SectorService, SectorControllerService } from './shared';
import { AuthInterceptorProvider } from 'src/app/interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from 'src/app/interceptors/error-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
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
    SectorService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ]
})
export class SectorsPageModule {}
