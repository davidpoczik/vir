import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration.component';
import { AdministrationModulesComponent } from './administration-modules/administration-modules.component';
import { AdministrationModulesEditComponent } from './administration-modules-edit/administration-modules-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent
  },
  {
    path: 'modulok',
    component: AdministrationModulesComponent
  },
  {
    path: 'modulok/:id',
    component: AdministrationModulesEditComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
