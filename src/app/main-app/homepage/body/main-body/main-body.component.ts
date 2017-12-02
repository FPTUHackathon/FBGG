import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent implements OnInit {
  @HostBinding('class') classes = 'pt-4 pl-4';

  searchForm: FormGroup;

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchForm = this._fb.group({
      query: ['']
    });
  }

  onSubmit() {
    console.log(123);
  }
}
