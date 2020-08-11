import { TestBed } from '@angular/core/testing';

import { AuthenticationControllerService } from './authentication-controller.service';

describe('AuthenticationControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationControllerService = TestBed.get(AuthenticationControllerService);
    expect(service).toBeTruthy();
  });
});
