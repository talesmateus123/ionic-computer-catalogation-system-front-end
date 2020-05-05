import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComputerPage } from './new-computer.page';

const routes: Routes = [
  {
    path: '',
    component: NewComputerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewComputerPageRoutingModule {}
