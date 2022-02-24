import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Urls } from 'src/app/core/constants/url.constant'
import { AutomaticMeasurementComponent } from './automatic-measurement/automatic-measurement.component'
import { CloseMeasurementComponent } from './automatic-measurement/close-measurement/close-measurement.component'
import { FaultyProductHandlerComponent } from './automatic-measurement/faulty-product-handler/faulty-product-handler.component'
import { HandlePackagingComponent } from './automatic-measurement/handle-packaging/handle-packaging.component'
import { TourSelectorComponent } from './automatic-measurement/tour-selector/tour-selector.component'
import { UnmeasuredItemsComponent } from './automatic-measurement/unmeasured-items/unmeasured-items.component'

const urlHelper = new Urls

const routes: Routes = [
  {
    path: 'automata-kimeres',
    component: AutomaticMeasurementComponent,
    data: {
      getUrl: '',
      id: ''
    },
    children: [
      {
        path: 'tura-valaszto',
        component: TourSelectorComponent
      },
      {
        path: 'hibas-termek-kezelo',
        component: FaultyProductHandlerComponent
      },
      {
        path: 'kimeretlen-tetelek',
        component: UnmeasuredItemsComponent
      },
      {
        path: 'gongyoleg-kezeles',
        component: HandlePackagingComponent
      },
      {
        path: 'kimeres-zaras',
        component: CloseMeasurementComponent
      },
      {
        path: '',
        redirectTo: 'tura-valaszto'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/vezerlopult'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
