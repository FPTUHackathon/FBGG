import { TestBed, inject } from '@angular/core/testing';

import { ChatlogSocketService } from './chatlog-socket.service';

describe('ChatlogSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatlogSocketService]
    });
  });

  it('should be created', inject([ChatlogSocketService], (service: ChatlogSocketService) => {
    expect(service).toBeTruthy();
  }));
});
