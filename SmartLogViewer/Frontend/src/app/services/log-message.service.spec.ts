import { TestBed } from '@angular/core/testing';

import { LogMessageService } from './log-message.service';

describe('LogMessageService', () => {
  let service: LogMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
