import { TestBed } from '@angular/core/testing';

import { InfoService } from './info.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment.production';
import { error } from '../../test_common/error'
import { HttpResponse } from '@angular/common/http';
import {formatDate, registerLocaleData} from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

let firmwareList: any = [
  "MAPK_ByPass_v1_7_8.ini",
  "MAPK_ByPass_v2_02_00.ini",
  "MAPK_Module_RD_IV_v1_7_8.ini",
  "MAPK_Module_RD_IV_v2_02_00.ini",
  "MAPK_Unit_v1_7_8.ini",
  "MAPK_Unit_v2_02_00.ini"
];

describe('InfoService', () => {
  let service: InfoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [
        InfoService, 
        { provide: BaseURL, useValue: environment.BaseURL }
      ]
    });
    service = TestBed.inject(InfoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid response', () => {

    service.GetFirmwares().subscribe(result => {
      if(result instanceof HttpResponse) {
        expect(result.body).toEqual(firmwareList);
      }
      
    })

    const req = httpTestingController.expectOne(`${environment.BaseURL}/info/firmwarelist`);
    expect(req.request.method).toBe("GET");
    req.flush(firmwareList);
  });

  it('should return an error response', () => {

    service.GetFirmwares().subscribe(result => {
      if(result instanceof HttpResponse) {
        expect(result.body).toEqual(error);
      }
      
    })

    const req = httpTestingController.expectOne(`${environment.BaseURL}/info/firmwarelist`);
    expect(req.request.method).toBe("GET");
    req.flush(error);
  });

});
