import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
    private toastService: HotToastService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {

  }
  onLogout() {
    this.authService.logout()
    this.router.navigate(['/login/auth']).then(() => {
      this.toastService.success(this.translateService.instant('successfull_logout'))
    }
    )

  }
}
