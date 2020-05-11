import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipments',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/').then( m => m.RegisterPageModule)
  },
  {
    path: 'sectors',
    loadChildren: () => import('./pages/').then( m => m.SectorsPageModule)
  },
  {
    path: 'equipments',
    loadChildren: () => import('./pages/equipments/equipments.module').then( m => m.EquipmentsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
