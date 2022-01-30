import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class ModuleGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
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

}
