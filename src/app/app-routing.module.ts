import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';
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
        canActivate: [AuthGuardService]
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: 'modules/:id',
    component: LayoutComponent,
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
    canActivate: [ModuleGuardService],
    canActivateChild: [ModuleGuardService]
  },

  {
    path: '**',
    redirectTo: 'auth'
  },
  {
    path: '',
    component: LayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
