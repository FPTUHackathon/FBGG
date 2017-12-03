import { Injectable } from '@angular/core';

@Injectable()
export class ChatboxService {
  selectChatbox: any;
  chatboxList: any[] = [];

  constructor() { }

  addChatbox(chatbox) {
    this.chatboxList.push(chatbox);
  }

  getChatboxList() {
    return this.chatboxList;
  }
  
  getSelectChatbox() {
    return this.selectChatbox;
  }

  setSelectChatbox(chatbox) {
    this.selectChatbox = chatbox;
  }
}
