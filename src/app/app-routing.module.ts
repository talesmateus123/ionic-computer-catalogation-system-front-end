import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NoConnectionPage } from './pages/no-connection/no-connection.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth-or-home',
    pathMatch: 'full'
  },
  {
    path: 'auth-or-home',
    loadChildren: () => import('./pages/authentication/auth-or-home/auth-or-home.module').then( m => m.AuthOrHomePageModule)
  },
  {
    path: 'equipments',
    loadChildren: () => import('./pages').then( m => m.EquipmentsPageModule)
  },
  {
    path: 'computer-users',
    loadChildren: () => import('./pages').then( m => m.ComputerUsersPageModule)
  },
  {
    path: 'sectors',
    loadChildren: () => import('./pages').then( m => m.SectorsPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages').then( m => m.ReportsPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages').then( m => m.UserManagementPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'no-connection',
    component: NoConnectionPage
  },
  {
    path: '**',
    component: NotFoundPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
