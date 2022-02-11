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
  isUserMenuOpen?: boolean = false
  isSearchOpen?: boolean = false
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

    this.sidebarService.getViews()

    this.authService.userData?.subscribe((responseUser: User | null) => {
      this.user = (responseUser) ? responseUser : undefined
      this.ref.markForCheck()
    })
  }

  onClickUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen
    this.ref.markForCheck()
  }

  onLogout() {
    this.authService.logout()
    this.router.navigateByUrl('/auth')
  }


  onSidebarToggle() {
    this.isSidebarOpen = this.sidebarService.toggleSidebar()
  }

  onSearchClicked() {
    this.isSearchOpen = !this.isSearchOpen
    this.ref.markForCheck()
  }

  onSearchClosed() {
    this.isSearchOpen = false
    this.ref.markForCheck()
  }

}
