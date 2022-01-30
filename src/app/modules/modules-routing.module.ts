import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarResolverService } from '../core/resolvers/sidebar-resolver.service';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { root: true },
    resolve: {
      sidebar: SidebarResolverService
    },
    component: DashboardComponent,
  },
  {
    path: ':id/adminisztracio',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),

  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ModulesRoutingModule {

}
