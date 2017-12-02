import { Injectable } from '@angular/core';

@Injectable()
export class ChatboxService {
  chatboxList: any[] = [];

  constructor() { }

  addChatbox(chatbox) {
    this.chatboxList.push(chatbox);
  }

  getChatboxList() {
    return this.chatboxList;
  }
  
}
