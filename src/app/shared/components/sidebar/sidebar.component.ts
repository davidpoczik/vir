import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterPreloader } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Location } from "@angular/common";
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { loginApiResponseData } from 'src/app/core/models/login.model';


@Component({
  selector: 'vir-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  sidebar$?: Observable<loginApiResponseData>

  ngOnInit(): void {


    this.sidebarService.sidebar.subscribe(response => {
      this.sidebar = of(response.data)



      this.ref.markForCheck()


    })



  }

  constructor(
    private route: ActivatedRoute,
    private sidebarService: SidebarService,
    private ref: ChangeDetectorRef) {


    const module_id = this.route.snapshot.params['id']

    this.sidebar$ = this.sidebarService.getSidebar(module_id)


  }


}
