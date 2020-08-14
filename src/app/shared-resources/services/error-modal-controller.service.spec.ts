import { TestBed } from '@angular/core/testing';

import { ToastMessageControllerService } from './toast-message-controller.service';

describe('ToastMessageControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastMessageControllerService = TestBed.get(ToastMessageControllerService);
    expect(service).toBeTruthy();
  });
});
