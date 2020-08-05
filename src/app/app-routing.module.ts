import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipments',
    pathMatch: 'full'
  },
  {
    path: 'equipments',
    loadChildren: () => import('./pages/').then( m => m.EquipmentsPageModule)
  },
  {
    path: 'computer-users',
    loadChildren: () => import('./pages/').then( m => m.ComputerUsersPageModule)
  },
  {
    path: 'sectors',
    loadChildren: () => import('./pages/').then( m => m.SectorsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages').then( m => m.ReportsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
