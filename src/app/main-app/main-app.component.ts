import { Component, OnInit, OnDestroy, AfterViewInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './../shared/services/loader/loader.service';
import { UserService } from '../shared/services/user/user.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { ChatboxListService } from '../shared/services/chatbox-list/chatbox-list.service';
import { ChatboxService } from '../shared/services/chatbox/chatbox.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'd-block';

  user: any = {};
  _subscription: Subscription;
  isDisplayChatboxList: boolean;
  chatboxList: any[] = [];

  constructor(
    private loaderService: LoaderService,
    private userService: UserService,
    private authService: AuthService,
    private chatboxListService: ChatboxListService,
    private chatboxService: ChatboxService
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

    this.isDisplayChatboxList = this.chatboxListService.getDisplayChatboxListStatus();
    this._subscription = this.chatboxListService.isDisplayChatboxListChange.subscribe(status => {
      this.isDisplayChatboxList = status;
    });

    this.chatboxList = this.chatboxService.getChatboxList();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
