import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Urls } from 'src/app/core/constants/url.constant'
import { DataCheckComponent } from './data-check/data-check.component';
import { PdaCheckComponent } from './pda-check/pda-check.component';
import { ComissionTransferComponent } from './pda-transfer-switcher/comission-transfer/comission-transfer.component';
import { PdaTransferSwitcherComponent } from './pda-transfer-switcher/pda-transfer-switcher.component';
import { StoreToBaseComponent } from './pda-transfer-switcher/store-to-base/store-to-base.component';
import { StorageCheckerWorkerComponent } from './storage-checker-worker/storage-checker-worker.component';
import { PdaStartComponent } from './warehouse-pda-start/warehouse-pda-start.component';
import { WarehousePdaComponent } from './warehouse-pda.component';

const urlHelper = new Urls

const routes: Routes = [
    {
        path: 'raktari-pda',
        component: WarehousePdaComponent,
        data: {
            getUrl: '',
            id: ''
        },
        children: [
            {
                path: '',
                component: PdaStartComponent,
            },
            {
                path: 'ellenorzes',
                component: PdaCheckComponent,
            },
            {
                path: 'attarolas-muv-valaszto',
                component: PdaTransferSwitcherComponent,
            },
            {
                path: 'attarolas-altalanos-tarhely',
                component: StoreToBaseComponent,
            },
            {
                path: 'attarolas-kom-tarhely',
                component: ComissionTransferComponent,
            },
            {
                path: 'tars-adat-ellenorzes',
                component: DataCheckComponent,
            },
            {
                path: 'tarhely-ellenorzes-munkatars',
                component: StorageCheckerWorkerComponent
            }
        ]
    },
    {
        path: 'raktari-pda/:viewID',
        component: WarehousePdaComponent,
        data: {
            getUrl: '',
            id: ''
        },
        children: [
            {
                path: '',
                component: PdaStartComponent,
            },
            {
                path: 'ellenorzes',
                component: PdaCheckComponent,

            },
        ]
    },
    {
        path: '',
        redirectTo: 'raktari-pda'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WarehousePdaRoutingModule { }
