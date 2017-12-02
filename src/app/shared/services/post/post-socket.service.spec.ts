import { TestBed, inject } from '@angular/core/testing';

import { PostSocketService } from './post-socket.service';

describe('PostSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostSocketService]
    });
  });

  it('should be created', inject([PostSocketService], (service: PostSocketService) => {
    expect(service).toBeTruthy();
  }));
});
