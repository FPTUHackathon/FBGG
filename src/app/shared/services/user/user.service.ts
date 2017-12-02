import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  private user: any = {};
  private postedDocuments: any[] = [];
  private concernTopics: any = {};
  private notes: any[] = [];

  userChange: Subject<any> = new Subject<any>();
  postedDocumentsChange: Subject<any[]> = new Subject<any[]>();
  notesChange: Subject<any[]> = new Subject<any[]>();

  constructor(
    private authService: AuthService
  ) { }

  getUser() {
    return this.user;
  }

  setUser(user: any) {
    user.postedDocuments = [];
    this.user._id = user._id;
    this.user.mail = user.mail;
    this.user.name = user.name;
    this.user.nickName = user.nickName;
    this.user.phone = user.phone;
    this.user.address = user.address;
    this.user.postedDocuments = user.postedDocuments;
    this.user.rating = user.rating;
  }

  getPostedDocuments(): any[] {
    return this.postedDocuments;
  }

  setPostedDocuments(documents: any[]) {
    documents.sort((a, b) => {
      return b._id - a._id;
    });
    this.postedDocuments = documents;
    this.postedDocumentsChange.next(documents);
  }

  addPostedDocument(document: any) {
    this.postedDocuments.unshift(document);
    this.postedDocumentsChange.next(this.postedDocuments);
  }

  getNotes(): any[] {
    return this.notes;
  }

  setNotes(notes: any) {
    this.notes = notes;
    this.notesChange.next(notes);
  }

  addNote(note: any) {
    this.notes.unshift(note);
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
  }
}
