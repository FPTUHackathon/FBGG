import { Injectable } from '@angular/core';

import { Socket } from './../../constants/constants';

import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Injectable()
export class UserSocketService {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  getPostedDocuments() {
    Socket.emit('req_send_all_my_post', { token: this.authService.getToken() });
  }

  addNote(data) {
    Socket.emit('req_new_note', data);
  }

  getNotes(data) {
    Socket.emit('req_send_note', data);
  }

  deleteNote(data) {
    Socket.emit('req_del_note', data);
  }

  consumeEventOnGetPostedDocuments() {
    Socket.on('server_send_all_your_post', data => {
      this.userService.setPostedDocuments(data);
    });
  }

  consumeEventOnAddNote() {
    Socket.on('server_send_new_note', data => {
      this.userService.addNote(data);
    });
  }

  consumeEventOnGetNotes() {
    Socket.on('server_send_all_note', data => {
      this.userService.setNotes(data);
      console.log(data);
    });
  }
}
