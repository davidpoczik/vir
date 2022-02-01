import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class ModuleGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true
    }
    else {
      this.router.navigate(['auth/login'])
      return false
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {

    if (this.authService.isLoggedIn()) {
      return true
    }
    else {
      this.router.navigate(['auth/login'])
      return false
    }
  }

}
