import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoComputerPage } from './info-computer.page';

const routes: Routes = [
  {
    path: '',
    component: InfoComputerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoComputerPageRoutingModule {}
