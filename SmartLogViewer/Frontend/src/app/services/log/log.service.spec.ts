import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';
import { mockLog } from 'src/app/test_common/logMock';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogService);
  });

  // TUV-59: Verifica che la classe venga istanziata correttamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TUV-60: Verifica che venga ritornato un log indefinito
  it('should have undefined log', () => {
    expect(service.getLog()).toBeUndefined();
  });

  // TUV-61: Verifica che il log attuale venga impostato correttamente
  it('should set log', () => {
    service.Log = mockLog;
    expect(service.getLog()).toEqual(mockLog);
  });

  // TUV-62: Verifica che la rimozione del log attuale avvenga correttamente
  it('should set and clean log', () => {
    service.Log=mockLog;
    service.clean();
    expect(service.getLog()).toBeUndefined();
  });

  // TUV-63: Verifica che il log attuale sia non valido
  it('should be invalid log', () => {
    expect(service.validLog()).toBeFalse();
  });

  // TUV-64: Verifica che il log attuale sia valido
  it('should be valid log', () => {
    service.Log=mockLog;
    expect(service.validLog()).toBeTrue();
  });
});
