
import { Component, Input, OnInit } from '@angular/core';
import { SidebarMenuItem } from 'src/app/core/models/sidebar.model';

@Component({
  selector: 'vir-sidebar-link-item',
  templateUrl: './sidebar-link-item.component.html'
})
export class SidebarLinkItemComponent implements OnInit {

  @Input() sidebarElement: SidebarMenuItem | any

  constructor() { }

  ngOnInit(): void { }

}
