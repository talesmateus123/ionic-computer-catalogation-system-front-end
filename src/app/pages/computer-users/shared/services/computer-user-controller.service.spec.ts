import { TestBed } from '@angular/core/testing';

import { ComputerUserControllerService } from './computer-user-controller.service';

describe('ComputerUserControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComputerUserControllerService = TestBed.get(ComputerUserControllerService);
    expect(service).toBeTruthy();
  });
});
