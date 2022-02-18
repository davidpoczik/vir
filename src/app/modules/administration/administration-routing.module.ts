import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationViewsEditComponent } from './views/administration-views-edit/administration-views-edit.component';
import { AdministrationViewsNewComponent } from './views/administration-views-new/administration-views-new.component';
import { DashboardListComponent } from './shared/dashboard-list/dashboard-list.component';
import { environment } from 'src/environments/environment';
import { AdministrationPermissionsEditComponent } from './permissions/administration-permissions-edit/administration-permissions-edit.component';
import { Urls } from 'src/app/core/constants/url.constant';

const urlHelper = new Urls

const routes: Routes = [
  {
    path: 'kepernyok/:viewID',
    component: DashboardListComponent,
    data: {
      getUrl: urlHelper.api.administration.view.get,
      id: `w_vir_kepernyo_id`,
      newButton: true,
    }
  },
  {
    path: 'kepernyok/:viewID/szerk/:id',
    component: AdministrationViewsEditComponent,
    data: {
      listBlueprint: [
        ['sm_ceghierarchia_id'], ['nev']
      ]
    }
  },
  {
    path: 'kepernyok/:viewID/uj',
    component: AdministrationViewsNewComponent,

  },
  {
    path: 'jogosultsagok/:permissionID',
    component: DashboardListComponent,
    data: {
      getUrl: urlHelper.api.administration.permission.get,
      id: `w_vir_csop_jogosultsag_id`,
      newButton: false
    }
  },
  {
    path: 'jogosultsagok/:permissionID/szerk/:id',
    data: {
      getUrl: urlHelper.api.administration.view.edit,
      saveUrl: urlHelper.api.administration.view.save,
      listBlueprint: [
        ['sm_munkatars_id'], ['teljes_nev', 'beosztas']
      ]
    },
    component: AdministrationPermissionsEditComponent,
  },
  {
    path: '',
    redirectTo: '/vezerlopult'
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
