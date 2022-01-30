import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';

@Injectable({ providedIn: 'root' })
export class SidebarResolverService implements Resolve<any> {
  constructor(private sidebarService: SidebarService) {

  }
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

    this.sidebarService.getSidebar(route.data, route.params).pipe(take(1)).subscribe(response => {
      this.sidebarService.sidebar.next(response)
      return of(response)
    })

  }
}
