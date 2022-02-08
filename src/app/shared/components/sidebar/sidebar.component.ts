import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { SidebarMenuItem } from 'src/app/core/models/sidebar.model';

import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'vir-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('sidebarToggle', [
      state('opened', style({
        left: '0vw',
        opacity: 1,
      })),
      state('closed', style({
        left: '-100vw',
        opacity: 0
      })),
      transition('closed => opened', [
        animate('0.5s cubic-bezier(0.8,0.3,0,1)')
      ]),
      transition('opened => closed', [
        animate('0.5s cubic-bezier(0.8,0.3,0,1)')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  isOpened = false
  sidebar?: SidebarMenuItem[]

  constructor(
    private sidebarService: SidebarService,
    private ref: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {

    this.sidebarService.getViews()
      .subscribe(sidebarResponse => {
        if (sidebarResponse.success) {
          this.sidebar = sidebarResponse.data
          this.ref.markForCheck()
        }
      })

    this.sidebarService.isOpen.subscribe(response => {
      this.isOpened = response
      console.log(this.isOpened)
      this.ref.markForCheck()

    })
  }

  ngOnDestroy(): void {

  }

}
