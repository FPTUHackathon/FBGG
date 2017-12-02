import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.scss']
})
export class SuggestComponent implements OnInit {
  @HostBinding('class') classes = 'bg-white mx-4';

  constructor() { }

  ngOnInit() {
  }

}
