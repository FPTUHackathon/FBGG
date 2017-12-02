import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatboxListComponent } from './chatbox-list.component';

describe('ChatboxListComponent', () => {
  let component: ChatboxListComponent;
  let fixture: ComponentFixture<ChatboxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatboxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
