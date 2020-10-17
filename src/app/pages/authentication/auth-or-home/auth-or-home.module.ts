import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthOrHomePageRoutingModule } from './auth-or-home-routing.module';

import { AuthOrHomePage } from './auth-or-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthOrHomePageRoutingModule
  ],
  declarations: [AuthOrHomePage]
})
export class AuthOrHomePageModule {}
