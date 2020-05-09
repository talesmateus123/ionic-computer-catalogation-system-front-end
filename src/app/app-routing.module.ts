import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'computers',
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
    path: 'computers',
    loadChildren: () => import('./pages/').then( m => m.ComputersPageModule)
  },
  {
    path: 'sectors',
    loadChildren: () => import('./pages/').then( m => m.SectorsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
