import { TestBed } from '@angular/core/testing';

import { RamMemoryService } from './ram-memory.service';

describe('RamMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RamMemoryService = TestBed.get(RamMemoryService);
    expect(service).toBeTruthy();
  });
});
