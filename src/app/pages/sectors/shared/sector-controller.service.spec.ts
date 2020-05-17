import { TestBed } from '@angular/core/testing';

import { SectorControllerService } from './sector-controller.service';

describe('SectorControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SectorControllerService = TestBed.get(SectorControllerService);
    expect(service).toBeTruthy();
  });
});
