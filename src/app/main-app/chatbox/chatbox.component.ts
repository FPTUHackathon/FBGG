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
      data.user_id_send = this.user._id;
      data.user_id_receive = this.chatbox.targetUser._id;
      data.msg = this.messageForm.value.message;
      data.created_at = new Date();
      data.updated_at = new Date();
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
