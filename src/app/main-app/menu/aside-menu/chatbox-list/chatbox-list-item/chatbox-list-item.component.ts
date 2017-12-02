import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-chatbox-list-item',
  templateUrl: './chatbox-list-item.component.html',
  styleUrls: ['./chatbox-list-item.component.scss']
})
export class ChatboxListItemComponent implements OnInit {
  @HostBinding('class') classes = 'd-flex py-3 pl-2 mr-2';

  constructor() { }

  ngOnInit() {
  }

}
