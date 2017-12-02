import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers: any = {};

    if (this.authService.getToken() !== 'undefined' && this.authService.isAuthenticated()) {
      headers.token = this.authService.getToken();      
    }

    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request);
  }
}
