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
  path: string;
  user: any = {};
  notes: any[] = [];
  isComment = true;
  isSetting = false;

  constructor(
    private userService: UserService,
    private userSocketService: UserSocketService,
    private chatboxService: ChatboxService,
    private chatlogSocketService: ChatlogSocketService
  ) { }

  ngOnInit() {
    this.post.price = Number.isInteger(Number(this.post.price)) ? Number(this.post.price).toFixed(3) : this.post.price;
    this.post.referDocuments = JSON.parse(this.post.referDocuments);

    this.user = this.userService.getUser();
    this._subscriptions.push(this.userService.userChange.subscribe(user => {
      this.user = user;
    }));

    this.notes = this.userService.getNotes();
    this._subscriptions.push(this.userService.notesChange.subscribe(notes => {
      this.notes = notes;
    }));
    console.log(this.post);
    const link = this.post.documentFile || this.post.documentLink;
    this.path = this.backendPath + '/' + this.user._id + '/' + this.post._id + link;
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
      this.chatlogSocketService.getMessagesHistory({user_id_send: currentUser._id, user_id_receive: targetUser._id});
      const newChatbox = {
        currentUser: currentUser,
        targetUser: targetUser,
        isClose: false,
        isCollase: false,
        msg: []
      };
      this.chatboxService.addChatbox(newChatbox);
      this.chatboxService.setSelectChatbox(newChatbox);
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

  openDocument() {
    console.log(this.path);
    window.open(this.path);
  }

  thue() {
    console.log(123);
    window.open('http://localhost:3000/5/5a237178d6cb0f20bcc7dee0/upload/2.docx');
  }

  buy() {
    console.log(456);
    window.open('http://localhost:3000/2/5a237178d6cb0f20bcc7dee0/upload/2.docx');
  }
}
