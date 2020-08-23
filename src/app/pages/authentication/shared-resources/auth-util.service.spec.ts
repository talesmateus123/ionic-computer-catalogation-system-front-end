import { TestBed } from '@angular/core/testing';

import { AuthUtilService } from './auth-util.service';

describe('AuthUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthUtilService = TestBed.get(AuthUtilService);
    expect(service).toBeTruthy();
  });
});
