import { Component, OnInit, AfterViewInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './../shared/services/loader/loader.service';
import { UserService } from '../shared/services/user/user.service';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
  @HostBinding('class') classes = 'd-block';

  user: any = {};
  _subscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loaderService.setLoadingStatus(false);
    }, 500);

    if (this.authService.getToken() !== 'undefined' && this.authService.isAuthenticated()) {
      const user = this.authService.decodeToken();
      this.userService.setUser(user);
      this.user = this.userService.getUser();
    }
  }
}
