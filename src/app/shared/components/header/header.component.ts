import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'vir-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {

  }
  onLogout() {
    const translatedLogoutMessage = this.translateService.instant('alert.successfull_logout')
    this.authService.logout()
    this.router.navigate(['/login/auth']).then(() => {
    })

  }
}
