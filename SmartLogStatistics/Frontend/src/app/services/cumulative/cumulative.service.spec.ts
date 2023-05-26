import { TestBed } from '@angular/core/testing';

import { CumulativeService } from './cumulative.service';

describe('CumulativeService', () => {
  let service: CumulativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CumulativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
