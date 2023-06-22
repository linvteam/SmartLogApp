import { TestBed } from '@angular/core/testing';

import { TotalByFirmwareService } from './total-by-firmware.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment.production';
import { HttpResponse } from '@angular/common/http';
import { response } from '../../test_common/totalbyfirmware-response'
import { error } from '../../test_common/error'
import {formatDate, registerLocaleData} from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

describe('TotalByFirmwareService', () => {
  let service: TotalByFirmwareService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [
        TotalByFirmwareService, 
        { provide: BaseURL, useValue: environment.BaseURL }
      ]
    });
    service = TestBed.inject(TotalByFirmwareService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // TUS-118: Verifica che la classe venga istanziata correttamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TUS-119: Verifica che venga ritornata una risposta valida dal back-end con il numero di occorrenze di un evento raggruppate per firmware
  it('should return a valid response', () => {
    let code: string = "S009";

    let start: Date = new Date(2020,7,21,17,0,28,47);
    let end: Date = new Date(2021,10,22,6,30,3,762);
    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';
    
    const startDatetime : string = formatDate(start, format, locale).replace(" ", "T");
    const endDatetime : string = formatDate(end, format, locale).replace(" ", "T");

    service.GetTotalByFirmware(start, end, code).subscribe(result => {
      if(result instanceof HttpResponse) {
        expect(result.body).toEqual(response);
      }
      
    })

    const req = httpTestingController.expectOne(`${environment.BaseURL}/data/totalbyfirmware/${startDatetime}/${endDatetime}/${code}`);
    expect(req.request.method).toBe("GET");
    req.flush(response);
  });

  // TUS-120: Verifica che venga ritornato un errore dal back-end alla richiesta del numero di occorrenze di un evento raggruppate per firmware
  it('should return an error response', () => {
    let code: string = "S009";

    let start: Date = new Date(2020,7,21,17,0,28,47);
    let end: Date = new Date(2021,10,22,6,30,3,762);
    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';
    
    const startDatetime : string = formatDate(start, format, locale).replace(" ", "T");
    const endDatetime : string = formatDate(end, format, locale).replace(" ", "T");

    service.GetTotalByFirmware(start, end, code).subscribe(result => {
      if(result instanceof HttpResponse) {
        expect(result.body).toEqual(error);
      }
      
    })

    const req = httpTestingController.expectOne(`${environment.BaseURL}/data/totalbyfirmware/${startDatetime}/${endDatetime}/${code}`);
    expect(req.request.method).toBe("GET");
    req.flush(error);
  })
});

