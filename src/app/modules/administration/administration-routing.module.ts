import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationModulesComponent } from './administration-modules/administration-modules.component';
import { AdministrationModulesEditComponent } from './administration-modules-edit/administration-modules-edit.component';


const routes: Routes = [

  {
    path: 'kepernyok/:viewid',
    component: AdministrationModulesComponent,
  },
  {
    path: 'kepernyok/:viewid/szerk/:id',
    component: AdministrationModulesEditComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
