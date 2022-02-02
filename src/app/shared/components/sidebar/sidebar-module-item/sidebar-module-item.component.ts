import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SidebarMenuItem } from 'src/app/core/models/sidebar.model';

@Component({
  selector: 'vir-sidebar-module-item',
  templateUrl: './sidebar-module-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarModuleItemComponent implements OnInit {

  @Input() sidebarElement: SidebarMenuItem | any

  constructor() { }

  ngOnInit(): void {

  }

}
