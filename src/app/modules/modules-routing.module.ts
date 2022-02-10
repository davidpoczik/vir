import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleGuardService } from '../core/guards/module-guard.service';
import { ViewPermissionGuard } from '../core/guards/view-permission.service';
import { AdministrationComponent } from './administration/administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';



export const routes: Routes = [
  {
    path: 'vezerlopult',
    component: DashboardComponent
  },
  {
    path: 'adminisztracio',
    component: AdministrationComponent,
    canActivateChild: [ViewPermissionGuard]
  },
  {
    path: 'adminisztracio',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),

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
