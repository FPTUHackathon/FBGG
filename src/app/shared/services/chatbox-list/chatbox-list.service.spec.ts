import { TestBed, inject } from '@angular/core/testing';

import { ChatboxListService } from './chatbox-list.service';

describe('ChatboxListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatboxListService]
    });
  });

  it('should be created', inject([ChatboxListService], (service: ChatboxListService) => {
    expect(service).toBeTruthy();
  }));
});
