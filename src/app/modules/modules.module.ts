import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from '../shared/components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent
  ],
  imports: [
    SharedModule,
    ModulesRoutingModule
  ]
})
export class ModulesModule { }
