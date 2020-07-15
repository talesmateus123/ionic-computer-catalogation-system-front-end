import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComputerUsersPage } from './computer-users.page';
import { NewComputerUserPage } from './new';
import { InfoComputerUserPage } from './info';
import { SearchComputerUserPage } from './search';

const routes: Routes = [
  {
    path: '',
    component: ComputerUsersPage
  },
  {
    path: 'new',
    component: NewComputerUserPage
  },
  {
    path: 'info/:id',
    component: InfoComputerUserPage
  },
  {
    path: 'search',
    component: SearchComputerUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComputerUsersPageRoutingModule {}
