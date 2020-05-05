import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { LoginPageModule } from '../authentication';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services';
import { StorageService } from 'src/app/services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoginPageModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    StorageService
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
