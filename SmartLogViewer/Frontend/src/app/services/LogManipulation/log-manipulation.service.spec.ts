import { TestBed } from '@angular/core/testing';

import { LogManipulationService } from './log-manipulation.service';

describe('LogManipulationService', () => {
  let service: LogManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
