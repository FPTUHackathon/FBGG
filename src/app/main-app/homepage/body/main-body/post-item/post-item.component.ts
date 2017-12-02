import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { DEFAULT_AVATAR_PATH } from './../../../../../shared/constants/constants';
import { BACKEND_PATH } from './../../../../../shared/constants/constants';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @HostBinding('class') classes = 'd-block mb-5';
  @Input() post: any;

  defaultAvatarPath: string = DEFAULT_AVATAR_PATH;
  backendPath = BACKEND_PATH;

  constructor() { }

  ngOnInit() {
  }

}
