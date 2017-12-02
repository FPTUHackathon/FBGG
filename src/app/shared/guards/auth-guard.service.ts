import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './../services/auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    if (this.authService.getToken() === 'undefined' || !this.authService.isAuthenticated()) {
      this.router.navigate(['/dang-nhap']);
      return false;
    }
    return true;
  }
}
