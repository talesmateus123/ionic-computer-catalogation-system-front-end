import { TestBed } from '@angular/core/testing';

import { StorageDeviceService } from './storage-device.service';

describe('StorageDeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageDeviceService = TestBed.get(StorageDeviceService);
    expect(service).toBeTruthy();
  });
});
