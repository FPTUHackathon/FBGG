import { TestBed, inject } from '@angular/core/testing';

import { MessageSocketService } from './message-socket.service';

describe('MessageSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageSocketService]
    });
  });

  it('should be created', inject([MessageSocketService], (service: MessageSocketService) => {
    expect(service).toBeTruthy();
  }));
});
