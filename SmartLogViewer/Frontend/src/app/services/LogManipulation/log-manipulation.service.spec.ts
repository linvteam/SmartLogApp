import { TestBed } from '@angular/core/testing';

import { LogManipulationService } from './log-manipulation.service';

describe('LogManipulationService', () => {
  let service: LogManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogManipulationService);
  });

  // TUV-65: Verifica che la classe venga istanziata correttamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
