import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { TopicService } from './../../../../shared/services/topic/topic.service';
import { AuthService } from './../../../../shared/services/auth/auth.service';
import { PostSocketService } from '../../../../shared/services/post/post-socket.service';
import { PostService } from '../../../../shared/services/post/post.service';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss']
})
export class CreatePostDialogComponent implements OnInit {
  @ViewChild('documentFile') documentFile;
 
  createPostForm: FormGroup;
  topics: any[] = [];
  filteredTopics: Observable<any[]>;
  user: any = {};

  constructor(
    public dialog: MatDialogRef<CreatePostDialogComponent>,
    private _fb: FormBuilder,
    private topicService: TopicService,
    private authService: AuthService,
    private postSocketService: PostSocketService,
    private postService: PostService
  ) { }

  ngOnInit() {
    if (this.authService.getToken() !== 'undefined' && this.authService.isAuthenticated()) {
      this.user = this.authService.decodeToken();
    }

    this.createPostForm = this._fb.group({
      title: ['', Validators.required],
      description: [''],
      documentLink: ['', Validators.required],
      documentFile: [''],
      referDocuments: this._fb.array([this.initReferDocument()]),
      topics: ['', Validators.required]
    });

    this.topicService.getAll()
    .subscribe(res => {
      this.topics = res.topics;
      this.filteredTopics = this.createPostForm.controls.topics.valueChanges
      .pipe(
        startWith({} as any),
        map(topic => topic && typeof topic === 'object' ? topic.name : topic),
        map(name => name ? this.filter(name) : this.topics.slice())
      );
    });
  }

  filter(name: string): any[] {
    return this.topics.filter(topic =>
      topic.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(topic: any): string {
    return topic ? topic.name : topic;
  }

  initReferDocument() {
    return this._fb.group({
      link: ['', Validators.required]
    });
  }

  addReferDocument() {
    const control = <FormArray>this.createPostForm.controls['referDocuments'];
    control.push(this.initReferDocument());
    console.log(control);
  }

  removeReferDocument(i: number) {
    const control = <FormArray>this.createPostForm.controls['referDocuments'];
    control.removeAt(i);
  }

  documentFileChange(e) {
    console.log(e.files);
    this.createPostForm.controls.documentLink.setValue(e.files[0].name);
  }

  onSubmit() {
    if (this.createPostForm.valid) {
      // const body: any = {};
      // body.title = this.createPostForm.value.title;
      // body.description = this.createPostForm.value.description;
      // body.documentLink = this.createPostForm.value.documentLink;
      // body.documentFile = this.documentFile.nativeElement.files[0];
      // body.referDocuments = this.createPostForm.value.referDocuments;
      // body.topics = this.createPostForm.value.topics;
      // body.user_id = this.user._id;
      // body.topic_name = this.createPostForm.value.topics.name;
      // body.created_at = Date.now();
      // body.updated_at = Date.now();
      let formData: FormData = new FormData();
      formData.append('title', this.createPostForm.value.title);
      formData.append('description', this.createPostForm.value.description);
      formData.append('documentLink', this.createPostForm.value.documentLink);
      formData.append('referDocuments', JSON.stringify(this.createPostForm.value.referDocuments));
      formData.append('topics', this.createPostForm.value.topics);
      formData.append('user_id', this.user._id);
      formData.append('topic_name', this.createPostForm.value.topics.name);
      formData.append('created_at', JSON.stringify(Date.now()));
      formData.append('updated_at', JSON.stringify(Date.now()));
      formData.append('documentFile', this.documentFile.nativeElement.files[0]);
      this.postService.addPostToServer(formData)
      .subscribe(res => {
        console.log(res);
      });
      this.dialog.close();
    }
  }
}
