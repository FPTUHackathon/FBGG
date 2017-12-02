import { Component, OnInit, OnDestroy, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs/Subscription';

import { DEFAULT_AVATAR_PATH } from './../../../shared/constants/constants';

import { AuthService } from './../../../shared/services/auth/auth.service';
import { UserSocketService } from '../../../shared/services/user/user-socket.service';
import { UserService } from '../../../shared/services/user/user.service';

import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';
import { ChatboxListComponent } from './chatbox-list/chatbox-list.component';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'mat-elevation-z2';
  @Input() user: any;
  defaultAvatarPath: string = DEFAULT_AVATAR_PATH;
  createPostDialog: MatDialogRef<CreatePostDialogComponent>;
  dialogConfig: MatDialogConfig = {
    panelClass: ['mix-bg', 'w-50']
  };
  _subscription: Subscription;
  postedDocuments: any[] = [];
  isDisplayChatboxList = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private userSocketService: UserSocketService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userSocketService.getPostedDocuments();

    this.postedDocuments = this.userService.getPostedDocuments();
    this._subscription = this.userService.postedDocumentsChange.subscribe((posts: any[]) => {
      this.postedDocuments = posts;
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/dang-nhap']);
  }

  openCreatePostDialog() {
    this.createPostDialog = this.dialog.open(CreatePostDialogComponent, this.dialogConfig);
  }

  toggleChatboxList() {
    this.isDisplayChatboxList = !this.isDisplayChatboxList;
  }
}
