import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable, of, Subscription, take } from 'rxjs';

import { SidebarService } from 'src/app/core/services/sidebar.service';
import { SidebarApiResponseData } from 'src/app/core/models/sidebar.model';


@Component({
  selector: 'vir-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {

  sidebar$: Observable<SidebarApiResponseData>

  routerState: string | UrlSegment[]


  constructor(
    private route: ActivatedRoute,
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.routerState = this.router.url
    this.sidebar$ = of()
  }

  ngOnInit(): void {
    console.log('initt')
    this.routerState = this.router.url
    if (this.route.snapshot.params.hasOwnProperty('id')) {
      const moduleID = this.route.snapshot.params['id']
      this.sidebar$ = this.sidebarService.getSidebarViews(moduleID)
    } else {
      this.sidebar$ = this.sidebarService.getSidebarModules()
    }
  }

  ngOnDestroy(): void {

  }

}
