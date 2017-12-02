import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DEFAULT_AVATAR_PATH } from './../../../../../shared/constants/constants';
import { BACKEND_PATH } from './../../../../../shared/constants/constants';

import { UserService } from '../../../../../shared/services/user/user.service';
import { ChatboxService } from '../../../../../shared/services/chatbox/chatbox.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'd-block mb-5';
  @Input() post: any;

  _subscription: Subscription;
  defaultAvatarPath: string = DEFAULT_AVATAR_PATH;
  backendPath = BACKEND_PATH;
  user: any = {};

  constructor(
    private userService: UserService,
    private chatboxService: ChatboxService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this._subscription = this.userService.userChange.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  openChatbox(currentUser, targetUser) {
    if (currentUser._id == targetUser._id) {
      this.chatboxService.addChatbox({currentUser: currentUser, targetUser: targetUser, isClose: false, isCollase: false});
    }
  }
}
