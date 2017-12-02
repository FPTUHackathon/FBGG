import { TestBed, inject } from '@angular/core/testing';

import { LoginSocketService } from './login-socket.service';

describe('LoginSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginSocketService]
    });
  });

  it('should be created', inject([LoginSocketService], (service: LoginSocketService) => {
    expect(service).toBeTruthy();
  }));
});
