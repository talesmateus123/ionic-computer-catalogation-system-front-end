import { TestBed } from '@angular/core/testing';

import { ElectronicComponentControllerService } from './electronic-component-controller.service';

describe('ElectronicComponentControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectronicComponentControllerService = TestBed.get(ElectronicComponentControllerService);
    expect(service).toBeTruthy();
  });
});
