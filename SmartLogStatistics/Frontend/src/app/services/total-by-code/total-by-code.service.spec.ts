import { TestBed } from '@angular/core/testing';

import { TotalByCodeService } from './total-by-code.service';

describe('TotalByCodeService', () => {
  let service: TotalByCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalByCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
