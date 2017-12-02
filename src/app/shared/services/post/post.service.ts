import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { createCommonHeaders } from './../../../shared/functions/http-req';

import { POST } from './../../../shared/api/api';

@Injectable()
export class PostService {
  posts: any[] = [];
  postsChange: Subject<any[]> = new Subject<any[]>();

  constructor (
    private http: HttpClient,
    private router: Router,
  ) {}

  addPost(post) {
    this.posts.push(post);
  }

  getPosts() {
    return this.posts;
  }

  unshiftPost(post) {
    this.posts.unshift(post);
  }

  addPostToServer(post): Observable<any> {
    const options = createCommonHeaders('');

    return this.http.post(POST.add, post, options);
  }
}
