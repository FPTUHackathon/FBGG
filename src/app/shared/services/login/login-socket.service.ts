import { Injectable } from '@angular/core';
import { Socket } from './../../constants/constants';
import { Router } from '@angular/router';

import { AuthService } from './../../../shared/services/auth/auth.service';

@Injectable()
export class LoginSocketService {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  register(user) {
    Socket.emit('register', user);
  }

  consumeEventOnRegister() {
    Socket.on('register_res', (data) => {
      if (data.token) {
        this.authService.setToken(data.token);
        this.router.navigate(['/']);
      }
    });
  }
}
