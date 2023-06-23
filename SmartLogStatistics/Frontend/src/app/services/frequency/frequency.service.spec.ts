import { TestBed } from '@angular/core/testing';

import { FrequencyService } from './frequency.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment.production';
import { response } from '../../test_common/frequency-response'
import { regroups } from '../../test_common/frequency-regroups'
import { error } from '../../test_common/error'
import { HttpResponse } from '@angular/common/http';
import {formatDate, registerLocaleData} from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

describe('FrequencyService', () => {
  let service: FrequencyService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [
        FrequencyService, 
        { provide: BaseURL, useValue: environment.BaseURL }
      ]
    });
    service = TestBed.inject(FrequencyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // TUS-106: Verifica che la classe venga istanziata correttamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TUS-107: Verifica che venga ritornata una risposta valida dal back-end coi dati degli eventi raggruppati
  it('should return a valid response', () => {
    let start: Date = new Date(2020,7,21,17,0,28,47);
    let end: Date = new Date(2025,10,22,6,30,3,762);
    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';
    
    const startDatetime : string = formatDate(start, format, locale).replace(" ", "T");
    const endDatetime : string = formatDate(end, format, locale).replace(" ", "T");

    service.GetTotalByFrequency(start, end, regroups).subscribe(result => {
      if(result instanceof HttpResponse) {
        expect(result.body).toEqual(response);
      }
      
    })

    const d = regroups.data;
    const f = regroups.firmware;
    const u = regroups.unit;
    const s = regroups.subunit;

    const req = httpTestingController.expectOne(`${environment.BaseURL}/data/frequency/${startDatetime}/${endDatetime}/?d=${d}&f=${f}&u=${u}&s=${s}`);
    expect(req.request.method).toBe("GET");
    req.flush(response);
  });

  // TUS-108: Verifica che venga ritornato un errore dal back-end alla richiesta dei dati degli eventi raggruppati
  it('should return an error response', () => {
    let end: Date = new Date(2020,7,21,17,0,28,47);
    let start: Date = new Date(2025,10,22,6,30,3,762);
    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';
    
    const startDatetime : string = formatDate(start, format, locale).replace(" ", "T");
    const endDatetime : string = formatDate(end, format, locale).replace(" ", "T");

    service.GetTotalByFrequency(start, end, regroups).subscribe(result => {
      if(result instanceof HttpResponse) {
        expect(result.body).toEqual(error);
      }
      
    })

    const d = regroups.data;
    const f = regroups.firmware;
    const u = regroups.unit;
    const s = regroups.subunit;

    const req = httpTestingController.expectOne(`${environment.BaseURL}/data/frequency/${startDatetime}/${endDatetime}/?d=${d}&f=${f}&u=${u}&s=${s}`);
    expect(req.request.method).toBe("GET");
    req.flush(error);
  })
});
