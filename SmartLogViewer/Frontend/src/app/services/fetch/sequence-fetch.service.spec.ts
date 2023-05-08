import { TestBed } from '@angular/core/testing';

import { SequenceFetchService } from './sequence-fetch.service';

describe('SequenceFetchService', () => {
  let service: SequenceFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequenceFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
