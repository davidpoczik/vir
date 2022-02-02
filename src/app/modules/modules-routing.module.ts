import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleGuardService } from '../core/guards/module-guard.service';
import { LayoutComponent } from '../shared/components/layout/layout.component';



export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'adminisztracio/:id',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
    component: LayoutComponent,
    canActivateChild: [ModuleGuardService]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ModulesRoutingModule {
  constructor() {

  }
}
