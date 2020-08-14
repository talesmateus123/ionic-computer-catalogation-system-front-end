import { TestBed } from '@angular/core/testing';

import { LoadingModalControllerService } from './loading-modal-controller.service';

describe('LoadingModalControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingModalControllerService = TestBed.get(LoadingModalControllerService);
    expect(service).toBeTruthy();
  });
});
