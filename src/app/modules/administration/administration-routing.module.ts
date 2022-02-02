import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration.component';
import { AdministrationModulesComponent } from './modules/modules.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent
  },
  {
    path: 'modulok',
    component: AdministrationModulesComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
