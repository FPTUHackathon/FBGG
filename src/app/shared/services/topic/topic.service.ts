import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { createCommonHeaders } from './../../../shared/functions/http-req';

import { TOPIC } from './../../../shared/api/api';

import { AuthService } from './../../../shared/services/auth/auth.service';

@Injectable()
export class TopicService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll(): Observable<any> {
    const options = createCommonHeaders();

    return this.http.get(TOPIC.getAll, options);
  }
}
