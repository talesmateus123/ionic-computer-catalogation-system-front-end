import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthOrHomePage } from './auth-or-home.page';

const routes: Routes = [
  {
    path: '',
    component: AuthOrHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthOrHomePageRoutingModule {}
