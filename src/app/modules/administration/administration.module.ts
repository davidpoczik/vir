import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';

import { AdministrationModulesComponent } from './administration-modules/administration-modules.component';
import { AdministrationModulesEditComponent } from './administration-modules-edit/administration-modules-edit.component';
import { AdministrationModulesNewComponent } from './administration-modules-new/administration-modules-new.component';
import { PermissionListComponent } from './shared/permission-list/permission-list.component';



@NgModule({
  declarations: [
    AdministrationModulesComponent,
    AdministrationModulesEditComponent,
    AdministrationModulesNewComponent,
    PermissionListComponent
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
