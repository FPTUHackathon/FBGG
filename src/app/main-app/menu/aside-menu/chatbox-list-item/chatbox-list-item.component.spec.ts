import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxListItemComponent } from './chatbox-list-item.component';

describe('ChatboxListItemComponent', () => {
  let component: ChatboxListItemComponent;
  let fixture: ComponentFixture<ChatboxListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatboxListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatboxListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
