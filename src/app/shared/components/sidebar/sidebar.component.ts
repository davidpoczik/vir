import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterPreloader } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Location } from "@angular/common";
import { SidebarService } from 'src/app/core/services/sidebar.service';


@Component({
  selector: 'vir-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  sidebar: Observable<any>

  ngOnInit(): void {
    this.sidebarService.sidebar.subscribe(response => {
      this.sidebar = of(response.data)
      this.ref.markForCheck()
      console.log('sidebar', this.route.snapshot.params)

    })



  }

  constructor(
    private route: ActivatedRoute,
    private sidebarService: SidebarService,
    private ref: ChangeDetectorRef) {
    this.sidebar = of([])



  }


}
