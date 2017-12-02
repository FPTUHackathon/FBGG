import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ChatboxListService {
  private isDisplayChatboxList = false;
  isDisplayChatboxListChange: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  getDisplayChatboxListStatus() {
    return this.isDisplayChatboxList;
  }

  setDisplayChatboxListStatus(status: boolean) {
    this.isDisplayChatboxList = status;
    this.isDisplayChatboxListChange.next(status);
  }
}
