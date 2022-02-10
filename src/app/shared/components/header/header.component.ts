import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';


@Component({
  selector: 'gastroprof-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  isSidebarOpen?: boolean = false
  sidebarSearchText = ''
  user?: User

  constructor(
    private sidebarService: SidebarService,
    private ref: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.sidebarService.isOpen.subscribe(response => {
      this.isSidebarOpen = response
      this.ref.markForCheck()
    })

    this.authService.userData.subscribe((responseUser: User | null) => {
      this.user = (responseUser) ? responseUser : undefined
      this.ref.markForCheck()
    })

    this.router.events.subscribe(event => {

    })
  }



  onSidebarToggle() {
    this.isSidebarOpen = this.sidebarService.toggleSidebar()
  }

}
