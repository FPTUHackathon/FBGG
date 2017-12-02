import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../../shared/services/user/user.service';
import { UserSocketService } from '../../../../shared/services/user/user-socket.service';
import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'd-block bg-white pl-3 py-3'
  user: any;
  notes: any[] = [];
  _subscriptions: Subscription[] = [];
  note: FormControl = new FormControl();

  constructor(
    private userService: UserService,
    private userSocketSerice: UserSocketService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this._subscriptions.push(this.userService.userChange.subscribe(user => {
      this.user = user;
    }));
    this.notes = this.userService.getNotes();
    this._subscriptions.push(this.userService.notesChange.subscribe(notes => {
      this.notes = notes;
    }));

    this.userSocketSerice.getNotes({id_user: this.user._id});
  }

  ngOnDestroy() {
    this._subscriptions.forEach((_subscription: Subscription) => {
      _subscription.unsubscribe();
    });
  }

  addNote(e) {
    console.log(e);
    if (e.key == 'Enter') {
      const data: any = {};
      data.content = this.note.value;
      data.id_user = this.user._id;
      data.type = 2;
      data.created_at = new Date();
      data.updated_at = new Date();
      this.userSocketSerice.addNote(data);
      this.note.reset();
    }
  }
}
