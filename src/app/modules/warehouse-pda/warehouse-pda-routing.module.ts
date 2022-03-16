import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Urls } from 'src/app/core/constants/url.constant'
import { PdaCheckComponent } from './pda-check/pda-check.component';
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
