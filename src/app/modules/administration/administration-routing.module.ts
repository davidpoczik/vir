import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationModulesComponent } from './administration-modules/administration-modules.component';
import { AdministrationModulesEditComponent } from './administration-modules-edit/administration-modules-edit.component';
import { AdministrationModulesNewComponent } from './administration-modules-new/administration-modules-new.component';


const routes: Routes = [
  {
    path: 'kepernyok/:viewID',
    component: AdministrationModulesComponent,
  },
  {
    path: 'kepernyok/:viewID/szerk/:id',
    component: AdministrationModulesEditComponent,
  },
  {
    path: 'kepernyok/:viewID/uj',
    component: AdministrationModulesNewComponent,
  },
  {
    path: 'jogosultsagok/:permissionID',
    component: AdministrationModulesComponent,
  },
  {
    path: 'jogosultsagok/:permissionID/szerk/:id',
    component: AdministrationModulesEditComponent,
  },
  {
    path: 'jogosultsagok/:permissionID/uj',
    component: AdministrationModulesNewComponent,
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
