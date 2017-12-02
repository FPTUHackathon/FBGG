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

  getMessagesHistory(arrayIdUser: any[]) {
    Socket.emit('req_send_all_msg_2', {array_id_user: arrayIdUser});
  }

  consumeEvenOnReceiveMessage() {
    Socket.on('server_send_all_msg_limit_5', data => {
      console.log(data);
    });
  }
}
