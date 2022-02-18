import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'vezerlopult',
    component: DashboardComponent
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
