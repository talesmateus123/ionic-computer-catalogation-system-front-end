import { TestBed } from '@angular/core/testing';

import { EquipmentControllerService } from "./";

describe('EquipmentControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipmentControllerService = TestBed.get(EquipmentControllerService);
    expect(service).toBeTruthy();
  });
});
