import { Component, OnInit, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @HostBinding('style.width.px') elWidth

  @HostListener('window:resize', ['$event']) sizeChange(event) {
    this.setWidth();
  }

  constructor() { }

  ngOnInit() {
    this.setWidth();
  }

  setWidth() {
    if (window.innerWidth < 950) {
      this.elWidth = window.innerWidth - 222 - 17 - 24;
    } else if (window.innerWidth < 1237) {
      this.elWidth = window.innerWidth - 222 - 17 - 256 - 48;
    } else {
      this.elWidth = window.innerWidth - 17 - 831;
    }
  }
}
