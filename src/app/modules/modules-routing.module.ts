import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPermissionGuard } from '../core/guards/view-permission.service';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'vezerlopult',
    component: DashboardComponent
  },
  {
    path: 'adminisztracio',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
    canActivateChild: [ViewPermissionGuard]
  },
  {
    path: 'raktar',
    loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule),
    canActivateChild: [ViewPermissionGuard]
  },
  {
    path: 'raktar-pda',
    loadChildren: () => import('./warehouse-pda/warehouse-pda.module').then(m => m.WarehousePdaModule),
    canActivateChild: [ViewPermissionGuard]
  },
  {
    path: '**',
    redirectTo: 'vezerlopult',
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ModulesRoutingModule {
  constructor() { }
}
