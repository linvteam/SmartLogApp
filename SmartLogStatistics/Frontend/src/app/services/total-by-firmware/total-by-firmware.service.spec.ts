import { TestBed } from '@angular/core/testing';

import { TotalByFirmwareService } from './total-by-firmware.service';

describe('TotalByFirmwareService', () => {
  let service: TotalByFirmwareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalByFirmwareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
