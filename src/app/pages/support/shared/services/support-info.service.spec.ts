import { TestBed } from '@angular/core/testing';

import { SupportInfoService } from './support-info.service';

describe('SupportInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupportInfoService = TestBed.get(SupportInfoService);
    expect(service).toBeTruthy();
  });
});
