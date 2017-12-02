import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor() { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    return tokenNotExpired(null, token);
  }

  decodeToken() {
    const jwtHelper: JwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(this.getToken());
  }
}
