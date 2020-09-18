import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportPage } from './support.page';
import { InfoSupportPage } from './info';
import { SearchSupportModalPage } from './modals';

const routes: Routes = [
  {
    path: '',
    component: SupportPage
  },
  {
    path: 'info/:id',
    component: InfoSupportPage
  },
  {
    path: 'search',
    component: SearchSupportModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportPageRoutingModule {}
