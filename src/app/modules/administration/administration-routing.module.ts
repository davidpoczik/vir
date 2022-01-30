import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarResolverService } from 'src/app/core/resolvers/sidebar-resolver.service';
import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  {
    path: '', component: AdministrationComponent,
    resolve: {
      sidebar: SidebarResolverService,
    }
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
