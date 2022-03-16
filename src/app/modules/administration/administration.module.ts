import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';

import { AdministrationViewsEditComponent } from './views/administration-views-edit/administration-views-edit.component';
import { AdministrationViewsNewComponent } from './views/administration-views-new/administration-views-new.component';
import { PermissionListComponent } from './shared/permission-list/permission-list.component';
import { DashboardListComponent } from './shared/dashboard-list/dashboard-list.component';
import { AdministrationPermissionsEditComponent } from './permissions/administration-permissions-edit/administration-permissions-edit.component';


@NgModule({
  declarations: [
    AdministrationViewsEditComponent,
    AdministrationViewsNewComponent,
    PermissionListComponent,
    DashboardListComponent,
    AdministrationPermissionsEditComponent
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule

  ],
  exports: [
    PermissionListComponent
  ]
})
export class AdministrationModule { }
