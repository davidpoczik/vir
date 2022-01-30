import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
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
    })
  }

  constructor(private route: ActivatedRoute, private sidebarService: SidebarService, private ref: ChangeDetectorRef) {
    this.sidebar = of([])
  }

}
