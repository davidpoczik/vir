import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleGuardService } from './core/guards/module-guard.service';
import { LayoutComponent } from './shared/components/layout/layout.component';

import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/vezerlopult',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
    component: LayoutComponent,
    canActivateChild: [ModuleGuardService]
  },
  { path: 'warehouse', loadChildren: () => import('./modules/warehouse/warehouse.module').then(m => m.WarehouseModule) },
  {
    path: '**',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
