import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadPostComponent } from './preload-post.component';

describe('PreloadPostComponent', () => {
  let component: PreloadPostComponent;
  let fixture: ComponentFixture<PreloadPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
