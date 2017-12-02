import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DEFAULT_AVATAR_PATH } from './../../../../../shared/constants/constants';
import { BACKEND_PATH } from './../../../../../shared/constants/constants';

import { UserService } from '../../../../../shared/services/user/user.service';
import { ChatboxService } from '../../../../../shared/services/chatbox/chatbox.service';
import { ChatlogSocketService } from '../../../../../shared/services/chatlog/chatlog-socket.service';
import { UserSocketService } from '../../../../../shared/services/user/user-socket.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'd-block mb-5';
  @Input() post: any;

  _subscriptions: Subscription[] = [];
  defaultAvatarPath: string = DEFAULT_AVATAR_PATH;
  backendPath = BACKEND_PATH;
  user: any = {};
  notes: any[] = [];

  constructor(
    private userService: UserService,
    private userSocketService: UserSocketService,
    private chatboxService: ChatboxService,
    private chatlogService: ChatlogSocketService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this._subscriptions.push(this.userService.userChange.subscribe(user => {
      this.user = user;
    }));

    this.notes = this.userService.getNotes();
    this._subscriptions.push(this.userService.notesChange.subscribe(notes => {
      this.notes = notes;
    }));
  }

  ngOnDestroy() {
    this._subscriptions.forEach((_subscription: Subscription) => {
      _subscription.unsubscribe()
    });
  }

  openChatbox(currentUser, targetUser) {
    const chatbox = this.chatboxService.chatboxList.find((val) => {
      return val.targetUser && val.targetUser._id == targetUser._id;
    });
    console.log(chatbox);
    if (!chatbox) {
      this.chatlogService.getMessagesHistory([currentUser._id, targetUser._id]);
      this.chatboxService.addChatbox({currentUser: currentUser, targetUser: targetUser, isClose: false, isCollase: false, array_id_user: [currentUser._id, targetUser._id], messages: []});
    } else {
      chatbox.isClose = !chatbox.isClose;
    }
  }

  note(post) {
    const duplicatePost = this.notes.find(val => {
      return val.id_post && val.id_post == post._id; 
    });
    const data: any = {};

    if (duplicatePost) {
      data.id_post = post._id;
      data.id_user = this.user._id;
      this.notes.forEach((val, index: number) => {
        if (val == duplicatePost) {
          this.userService.deleteNote(index);
        }
      });
      this.userSocketService.deleteNote(data);
      this.post.pin--;
    } else {

      this.post.pin++;
      data.id_user = this.user._id;
      data.id_post = post._id;
      data.content = post.title;
      data.link = post.documentFile || post.documentLink;
      data.type = 1;
      data.created_at = new Date();
      data.updated_at = new Date();
      this.userSocketService.addNote(data);
    }
  }
}
