import { TestBed } from '@angular/core/testing';

import { ElectronicService } from './electronic.service'

describe('ElectronicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectronicService = TestBed.get(ElectronicService);
    expect(service).toBeTruthy();
  });
});
