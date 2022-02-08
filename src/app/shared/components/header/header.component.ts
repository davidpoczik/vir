import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';


@Component({
  selector: 'vir-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
  }

  onSidebarToggle() {
    this.sidebarService.toggleSidebar()
  }

}
