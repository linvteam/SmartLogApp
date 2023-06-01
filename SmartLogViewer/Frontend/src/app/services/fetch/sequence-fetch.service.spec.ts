import { TestBed } from '@angular/core/testing';

import { SequenceFetchService } from './sequence-fetch.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';

describe('SequenceFetchService', () => {
  let service: SequenceFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: BaseURL, useValue: environment.baseUrl }]
    });
    service = TestBed.inject(SequenceFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
