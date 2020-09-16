import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentsPage } from './equipments.page';
import { InfoEquipmentPage } from './pages/info/info-equipment.page';
import { NewEquipmentPage } from './pages/new/new-equipment.page';
import { SearchEquipmentModalPage, HelpEquipmentModalPage } from './modals';

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
  },
  {
    path: 'electronic-components',
    loadChildren: () => import('./pages/electronic-components').then( m => m.ElectronicComponentsPageModule)
  },
  {
    path: 'help',
    component: HelpEquipmentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule],
})
export class EquipmentsPageRoutingModule {}
