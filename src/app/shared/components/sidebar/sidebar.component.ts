import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SidebarService } from 'src/app/core/services/sidebar.service';
import { SidebarApiResponseData } from 'src/app/core/models/sidebar.model';


@Component({
  selector: 'vir-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  sidebar$?: Observable<SidebarApiResponseData>

  constructor(
    private route: ActivatedRoute,
    private sidebarService: SidebarService,
    private ref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((response: { id?: number }) => {

      this.sidebar$ = this.sidebarService.getSidebar(response.id)
    })

  }


}
