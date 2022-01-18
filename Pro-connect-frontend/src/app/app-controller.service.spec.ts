import { TestBed } from '@angular/core/testing';

import { AppControllerService } from './app-controller.service';

describe('AppControllerService', () => {
  let service: AppControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
