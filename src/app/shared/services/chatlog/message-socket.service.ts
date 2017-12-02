import { Injectable } from '@angular/core';
import { Socket } from './../../constants/constants';
import { Router } from '@angular/router';

import { AuthService } from './../../../shared/services/auth/auth.service';
import { ChatboxService } from '../chatbox/chatbox.service';

@Injectable()
export class MessageSocketService {

  constructor(
    private authService: AuthService,
    private chatboxService: ChatboxService,
  ) { }

  sendMessage(data) {
    Socket.emit('req_new_msg_2', data);
  }

  consumeEvenOnReceiveMessage() {
    Socket.on('server_send_new_msg', data => {
      console.log(data);
      const chatbox = this.chatboxService.chatboxList.find(val => {
        return this.checkEqualArray(val.array_id_user, data.array_id_user);
      });
      if (chatbox) {
        chatbox.messages.unshift(data.msg);
      }
    });
  }

  checkEqualArray(array1, array2): boolean {
    if (array1.length && array2.length) {
      let l = array1.length;
      for (let i = 0; i < l; i++) {
        if (array1[i] != array2[i]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
