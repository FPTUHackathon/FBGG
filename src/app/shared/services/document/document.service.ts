import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

import { createCommonHeaders } from './../../../shared/functions/http-req';

import { DOCUMENT } from './../../../shared/api/api';

@Injectable()
export class DocumentService {

  constructor (
    private http: HttpClient,
    private router: Router,
  ) {}

  getDocument(filename) {
    const options = createCommonHeaders('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    return this.http.get(DOCUMENT.open + filename, {})
    .map((response: any) => {
      console.log(response);
      console.log(JSON.parse(response));
      // let fileBlob = response.blob();
      // let blob = new Blob([fileBlob], { 
      //    type: 'application/pdf' // must match the Accept type
      // });
    });
  }
}
