import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './shared/services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  _subscription: Subscription
  isLoading: boolean;

  constructor (
    private loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.isLoading = this.loaderService.getLoadingStatus();
    this._subscription = this.loaderService.isLoadingChange.subscribe(status => {
      this.isLoading = status;
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
