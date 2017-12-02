import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-chatbox-list',
  templateUrl: './chatbox-list.component.html',
  styleUrls: ['./chatbox-list.component.scss']
})
export class ChatboxListComponent implements OnInit {
  @HostBinding('class') classes = 'd-block bg-white mat-elevation-z2';
  chatboxList: any[] = [1, 2, 3, 4, 5, 6];

  constructor() { }

  ngOnInit() {
  }

}
