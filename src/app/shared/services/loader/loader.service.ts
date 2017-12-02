import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
  private isLoading = true;
  isLoadingChange: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  getLoadingStatus(): boolean {
    return this.isLoading;
  }

  setLoadingStatus(status: boolean) {
    this.isLoading = status;
    this.isLoadingChange.next(status);
  }
}
