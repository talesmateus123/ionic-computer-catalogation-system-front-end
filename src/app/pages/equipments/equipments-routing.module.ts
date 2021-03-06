import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentsPage } from './equipments.page';
import { InfoEquipmentPage } from './pages/info/info-equipment.page';
import { NewEquipmentPage } from './pages/new/new-equipment.page';
import { SearchEquipmentModalPage } from './modals';

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
    path: 'info/:id',
    component: InfoEquipmentPage
  },
  {
    path: 'search',
    component: SearchEquipmentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentsPageRoutingModule {}
