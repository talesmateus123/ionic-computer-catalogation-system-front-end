import { TestBed } from '@angular/core/testing';

import { SupportControllerService } from './support-controller.service';

describe('SupportControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupportControllerService = TestBed.get(SupportControllerService);
    expect(service).toBeTruthy();
  });
});
