import { Component, Input, OnInit } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { SidebarMenuItem } from 'src/app/core/models/sidebar.model';

@Component({
  selector: 'vir-sidebar-view-item',
  templateUrl: './sidebar-view-item.component.html'
})
export class SidebarViewItemComponent implements OnInit {

  @Input() sidebarElement: SidebarMenuItem | any
  @Input() moduleUrl: string | UrlSegment[] = ''

  isOpen = false

  constructor() {
  }

  ngOnInit(): void { }


  toggleOpener() {
    this.isOpen = !this.isOpen
  }

}
