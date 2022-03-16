import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';

import { AutomaticMeasurementComponent } from './automatic-measurement/automatic-measurement.component';
import { MeasurementSidebarComponent } from './shared/measurement-sidebar/measurement-sidebar.component';
import { TourSelectorComponent } from './automatic-measurement/tour-selector/tour-selector.component';
import { FaultyProductHandlerComponent } from './automatic-measurement/faulty-product-handler/faulty-product-handler.component';
import { UnmeasuredItemsComponent } from './automatic-measurement/unmeasured-items/unmeasured-items.component';
import { HandlePackagingComponent } from './automatic-measurement/handle-packaging/handle-packaging.component';
import { CloseMeasurementComponent } from './automatic-measurement/close-measurement/close-measurement.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AutomaticMeasurementComponent,
    MeasurementSidebarComponent,
    TourSelectorComponent,
    FaultyProductHandlerComponent,
    UnmeasuredItemsComponent,
    HandlePackagingComponent,
    CloseMeasurementComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    SharedModule
  ]
})
export class WarehouseModule { }
