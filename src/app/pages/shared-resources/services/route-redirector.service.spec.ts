import { TestBed } from '@angular/core/testing';

import { RouteRedirectorService } from './route-redirector.service';

describe('RouteRedirectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteRedirectorService = TestBed.get(RouteRedirectorService);
    expect(service).toBeTruthy();
  });
});
