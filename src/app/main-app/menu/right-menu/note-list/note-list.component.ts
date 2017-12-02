import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  @HostBinding('class') classes = 'd-block bg-white p-3'
  constructor() { }

  ngOnInit() {
  }

}
