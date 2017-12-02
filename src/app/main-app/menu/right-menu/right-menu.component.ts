import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {
  @HostBinding('class') classes = 'pt-4 d-flex';
  @HostBinding('style.width.px') elWidth;

  displayNoteList = true;
  displaySuggest = true;

  @HostListener('window:resize', ['$event']) sizeChange(event) {
    this.setView(event.target.innerWidth);
  }

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.setView(window.innerWidth);
  }

  setView(windowWidth: number) {
    if (windowWidth < 950) {
      this.displayNoteList = false;
      this.displaySuggest = false;
      this.elWidth = 24;
    } else if (windowWidth < 1237) {
      this.elWidth = 282;
      this.displayNoteList = true;
      this.displaySuggest = false;
    } else {
      this.displayNoteList = true;
      this.displaySuggest = true;
      this.elWidth = 609;
    };
  }
}
