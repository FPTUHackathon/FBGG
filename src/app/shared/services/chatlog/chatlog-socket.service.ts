import { Injectable } from '@angular/core';
import { Socket } from './../../constants/constants';
import { Router } from '@angular/router';

import { AuthService } from './../../../shared/services/auth/auth.service';
import { ChatboxService } from '../chatbox/chatbox.service';

@Injectable()
export class ChatlogSocketService {

  constructor(
    private authService: AuthService,
    private chatboxService: ChatboxService
  ) { }

  getMessagesHistory(data) {
    Socket.emit('req_send_all_msg_2', data);
  }

  consumeEvenOnReceiveMessage() {
    Socket.on('server_send_all_msg_2', data => {
      let msg: any[] = this.chatboxService.getSelectChatbox().msg;
      msg = msg.concat(data);
      msg.sort((a, b) => {
        return b._id - a._id; 
      });
      this.chatboxService.getSelectChatbox().msg = msg;
    });
  }
}
