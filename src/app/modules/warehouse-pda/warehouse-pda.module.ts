import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehousePdaRoutingModule } from './warehouse-pda-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WarehousePdaComponent } from './warehouse-pda.component';
import { PdaCheckComponent } from './pda-check/pda-check.component';
import { PdaStartComponent } from './warehouse-pda-start/warehouse-pda-start.component';

@NgModule({
  declarations: [
    WarehousePdaComponent,
    PdaCheckComponent,
    PdaStartComponent
  ],
  imports: [
    CommonModule,
    WarehousePdaRoutingModule,
    SharedModule
  ]
})
export class WarehousePdaModule { }
