import { Injectable } from '@angular/core';
import { Socket } from './../../constants/constants';
import { Router } from '@angular/router';

import { AuthService } from './../../../shared/services/auth/auth.service';
import { ChatboxService } from '../chatbox/chatbox.service';
import { ChatlogSocketService } from './../../../shared/services/chatlog/chatlog-socket.service';

@Injectable()
export class MessageSocketService {

  constructor(
    private authService: AuthService,
    private chatboxService: ChatboxService,
    private chatlogSocketService: ChatlogSocketService
  ) { }

  sendMessage(data) {
    Socket.emit('req_new_msg_2', data);
  }

  getSendUserInfo(data) {
    Socket.emit('req_get_user', data);
  }

  consumeEvenOnReceiveMessage() {
    Socket.on('server_send_new_msg', data => {
      const currentUser = this.authService.decodeToken();

      if (data.user_id_receive == this.authService.decodeToken()._id) {
        const chatbox = this.chatboxService.chatboxList.find(val => {
          return val.targetUser && val.currentUser._id == data.user_id_send && val.targetUser._id == data.user_id_receive
        });
        if (chatbox) {
          chatbox.msg.unshift(data);
          console.log(chatbox.msg);
        }
      } else {
        const chatbox = this.chatboxService.chatboxList.find(val => {
          return val.currentUser._id == data.user_id_send && val.targetUser._id == data.user_id_receive;
        });
        if (chatbox) {
          chatbox.msg.unshift(data);
          console.log(chatbox.msg);
        }
      }
      // const chatbox = this.chatboxService.chatboxList.find(val => {
      //   return val.currentUser._id == data.user_id_send && val.targetUser._id == data.user_id_receive
      // });
      // console.log(chatbox);
      // if (chatbox) {
      //   chatbox.msg.unshift(data);
      //   console.log(chatbox.msg);
      // }
    });
  }

  // checkEqualArray(array1, array2): boolean {
  //   if (array1.length && array2.length) {
  //     let l = array1.length;
  //     for (let i = 0; i < l; i++) {
  //       if (array2.indexOf(array1[i]) == -1) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   }
  //   return false;
  // }

  consumeEventOnReceiveUserInfo() {
    Socket.on('server_send_info_user', data => {
      console.log(data);
      this.chatboxService.getSelectChatbox().targetUser = data;
    });
  }
}
