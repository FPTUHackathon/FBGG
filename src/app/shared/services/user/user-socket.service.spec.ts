import { TestBed, inject } from '@angular/core/testing';

import { UserSocketService } from './user-socket.service';

describe('UserSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSocketService]
    });
  });

  it('should be created', inject([UserSocketService], (service: UserSocketService) => {
    expect(service).toBeTruthy();
  }));
});
