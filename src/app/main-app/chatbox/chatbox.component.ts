import { Component, OnInit, Input, ViewChild, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ChatboxService } from '../../shared/services/chatbox/chatbox.service';

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

  constructor(
    private fb: FormBuilder,
    private chatboxService: ChatboxService
  ) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      message: ['']
    });

    setTimeout(() => {
      this.chatList.directiveRef.scrollToBottom();      
    });
  }

  sendMessage(e) {
    if (e.key === 'Enter') {
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
