import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteComputerPage } from './delete-computer.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteComputerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteComputerPageRoutingModule {}
