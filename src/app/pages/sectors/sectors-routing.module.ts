import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectorsPage } from './sectors.page';
import { NewSectorPage } from './new';
import { InfoSectorPage } from './info';

const routes: Routes = [
  {
    path: '',
    component: SectorsPage
  },
  {
    path: 'new',
    component: NewSectorPage
  },
  {
    path: 'info/:id',
    component: InfoSectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorsPageRoutingModule {}