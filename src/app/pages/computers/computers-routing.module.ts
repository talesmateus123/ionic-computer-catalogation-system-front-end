import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComputersPage } from './computers.page';

const routes: Routes = [
  {
    path: '',
    component: ComputersPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new').then( m => m.NewComputerPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./update').then( m => m.UpdateComputerPageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./delete').then( m => m.DeleteComputerPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info').then( m => m.InfoComputerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComputersPageRoutingModule {}
