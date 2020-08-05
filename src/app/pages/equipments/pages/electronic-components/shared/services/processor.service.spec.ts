import { TestBed } from '@angular/core/testing';

import { ProcessorService } from './processor.service';

describe('ProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessorService = TestBed.get(ProcessorService);
    expect(service).toBeTruthy();
  });
});
