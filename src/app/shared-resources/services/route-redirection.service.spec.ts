import { TestBed } from '@angular/core/testing';

import { RouteRedirectionService } from './route-redirection.service';

describe('RouteRedirectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteRedirectionService = TestBed.get(RouteRedirectionService);
    expect(service).toBeTruthy();
  });
});
