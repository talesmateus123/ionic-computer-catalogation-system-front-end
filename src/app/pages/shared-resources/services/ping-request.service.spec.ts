import { TestBed } from '@angular/core/testing';

import { PingRequestService } from './ping-request.service';

describe('PingRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PingRequestService = TestBed.get(PingRequestService);
    expect(service).toBeTruthy();
  });
});
