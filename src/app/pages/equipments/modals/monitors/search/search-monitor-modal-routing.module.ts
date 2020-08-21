import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMonitorModalPage } from './search-monitor-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SearchMonitorModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMonitorModalPageRoutingModule {}
