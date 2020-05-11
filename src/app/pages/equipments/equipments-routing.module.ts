import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentsPage } from './equipments.page';
import { InfoEquipmentPage } from './info/info-equipment.page';
import { NewEquipmentPage } from './new/new-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: EquipmentsPage
  },
  {
    path: 'new',
    component: NewEquipmentPage
  },
  {
    path: 'info',
    component: InfoEquipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentsPageRoutingModule {}
