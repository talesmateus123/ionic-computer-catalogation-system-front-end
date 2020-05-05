import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateComputerPage } from './update-computer.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateComputerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateComputerPageRoutingModule {}
