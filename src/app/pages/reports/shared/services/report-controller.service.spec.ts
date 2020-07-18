import { TestBed } from '@angular/core/testing';

import { ReportControllerService } from './report-controller.service';

describe('ReportControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportControllerService = TestBed.get(ReportControllerService);
    expect(service).toBeTruthy();
  });
});
