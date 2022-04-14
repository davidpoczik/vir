import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehousePdaRoutingModule } from './warehouse-pda-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WarehousePdaComponent } from './warehouse-pda.component';
import { PdaCheckComponent } from './pda-check/pda-check.component';
import { PdaStartComponent } from './warehouse-pda-start/warehouse-pda-start.component';
import { PdaTransferSwitcherComponent } from './pda-transfer-switcher/pda-transfer-switcher.component';
import { StoreToBaseComponent } from './pda-transfer-switcher/store-to-base/store-to-base.component';
import { ComissionTransferComponent } from './pda-transfer-switcher/comission-transfer/comission-transfer.component';
import { DataCheckComponent } from './data-check/data-check.component';
import { StorageCheckerWorkerComponent } from './storage-checker-worker/storage-checker-worker.component';
import { EventListenerService } from 'src/app/core/services/event-listener.service';
import { LoadingRequestComponent } from './loading-request/loading-request.component';
import { BarcodeCheckerComponent } from './barcode-checker/barcode-checker.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryPairingComponent } from './inventory/inventory-pairing/inventory-pairing.component';
import { InventoryBaseComponent } from './inventory/inventory-base/inventory-base.component';

@NgModule({
  declarations: [
    WarehousePdaComponent,
    PdaCheckComponent,
    PdaStartComponent,
    PdaTransferSwitcherComponent,
    StoreToBaseComponent,
    ComissionTransferComponent,
    DataCheckComponent,
    StorageCheckerWorkerComponent,
    LoadingRequestComponent,
    BarcodeCheckerComponent,
    InventoryComponent,
    InventoryPairingComponent,
    InventoryBaseComponent
  ],
  imports: [
    CommonModule,
    WarehousePdaRoutingModule,
    SharedModule
  ]
})
export class WarehousePdaModule { }
