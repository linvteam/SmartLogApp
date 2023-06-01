import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';
import { mockLog } from 'src/app/test_common/logMock';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have undefined log', () => {
    expect(service.getLog()).toBeUndefined();
  });

  it('should set log', () => {
    service.Log = mockLog;
    expect(service.getLog()).toEqual(mockLog);
  });

  it('should set and clean log', () => {
    service.Log=mockLog;
    service.clean();
    expect(service.getLog()).toBeUndefined();
  });

  it('should be invalid log', () => {
    expect(service.validLog()).toBeFalse();
  });

  it('should be valid log', () => {
    service.Log=mockLog;
    expect(service.validLog()).toBeTrue();
  });
});
