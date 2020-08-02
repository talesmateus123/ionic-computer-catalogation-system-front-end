import { TestBed } from '@angular/core/testing';

import { ComputerUserService } from './computer-user.service';

describe('ComputerUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComputerUserService = TestBed.get(ComputerUserService);
    expect(service).toBeTruthy();
  });
});
