import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleGuardService } from '../core/guards/module-guard.service';
import { ViewPermissionGuard } from '../core/guards/view-permission.service';
import { DashboardComponent } from './dashboard/dashboard.component';



export const routes: Routes = [
  {
    path: 'vezerlopult',
    component: DashboardComponent
  },
  {
    path: 'adminisztracio/:id',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
    canActivateChild: [ModuleGuardService, ViewPermissionGuard]
  },
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
