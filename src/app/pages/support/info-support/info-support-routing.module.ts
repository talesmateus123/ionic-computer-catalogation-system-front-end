import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoSupportPage } from './info-support.page';

const routes: Routes = [
  {
    path: '',
    component: InfoSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoSupportPageRoutingModule {}
