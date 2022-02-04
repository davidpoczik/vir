import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';

import { AdministrationModulesComponent } from './administration-modules/administration-modules.component';
import { AdministrationModulesEditComponent } from './administration-modules-edit/administration-modules-edit.component';



@NgModule({
  declarations: [
    AdministrationModulesComponent,
    AdministrationModulesEditComponent
  ],
  imports: [
    SharedModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
