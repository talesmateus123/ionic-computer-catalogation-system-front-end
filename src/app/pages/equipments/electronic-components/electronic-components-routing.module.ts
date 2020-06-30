import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectronicComponentsPage } from './electronic-components.page';
import { NewElectronicComponentPage } from './new';
import { InfoElectronicComponentPage } from './info';

const routes: Routes = [
  {
    path: '',
    component: ElectronicComponentsPage
  },
  {
    path: 'new',
    component: NewElectronicComponentPage
  },
  {
    path: 'info/:id',
    component: InfoElectronicComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectronicComponentsPageRoutingModule {}
