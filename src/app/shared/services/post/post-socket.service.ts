import { Injectable, OnInit } from '@angular/core';
import { Socket } from './../../constants/constants';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { PostService } from './post.service';

@Injectable()
export class PostSocketService implements OnInit {
  constructor(
    private authSerice: AuthService,
    private userService: UserService,
    private postService: PostService
  ) { }

  ngOnInit() {
  }

  add(post) {
    Socket.emit('user_send_post_new', post);
  }

  consumeEventOnAdd() {
    Socket.on('new_post', data => {
      const user = this.userService.getUser();
      data.user = user;

      if (data.user_id == user._id) {
        this.userService.addPostedDocument(data);
      }
      this.postService.unshiftPost(data);
    });
  }

  consumeEventOnGetPosts() {
    Socket.on('server_send_post_and_comment', data => {
      const post: any = data.post;
      console.log(data);
      post.user = data.user_post;
      post.comment = data.comment;
      this.postService.addPost(post);
    });
  }
}
