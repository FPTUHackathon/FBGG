import { Component, OnInit, Input, ViewChild, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ChatboxService } from '../../shared/services/chatbox/chatbox.service';
import { MessageSocketService } from '../../shared/services/chatlog/message-socket.service';
import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  @ViewChild('chatList') chatList;
  @HostBinding('class') classes = 'bg-white mx-3';
  @Input() chatbox: any;
  @Input() index: number;

  messageForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private chatboxService: ChatboxService,
    private messageSocketService: MessageSocketService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      message: ['']
    });

    this.user = this.userService.getUser();

    setTimeout(() => {
      this.chatList.directiveRef.scrollToBottom();      
    });
  }

  sendMessage(e) {
    if (e.key === 'Enter') {
      const data: any = {};
      data.array_id_user = this.chatbox.array_id_user;
      data.msg = {
        id_user_send: this.chatbox.currentUser._id,
        content: this.messageForm.value.message,
        created_at: new Date(),
        updated_at: new Date(),
        type_msg: 1,
        user_seen: [this.chatbox.currentUser._id]
      }
      this.messageSocketService.sendMessage(data);
      this.messageForm.reset();
    }
  }

  closeChatbox() {
    this.chatbox.isClose = true;
  }

  collapseChatbox() {
    this.chatbox.isCollapse = !this.chatbox.isCollapse;
  }
}
