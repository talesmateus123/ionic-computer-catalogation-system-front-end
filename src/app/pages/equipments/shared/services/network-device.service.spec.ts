import { TestBed } from '@angular/core/testing';

import { NetworkDeviceService } from './network-device.service';

describe('NetworkDeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkDeviceService = TestBed.get(NetworkDeviceService);
    expect(service).toBeTruthy();
  });
});
