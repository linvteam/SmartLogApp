import { TestBed } from '@angular/core/testing';

import { StatisticsService } from './statistics.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment.production';
import { response } from '../../test_common/statistics-response'
import { error } from '../../test_common/error'
import { HttpResponse } from '@angular/common/http';
import {formatDate, registerLocaleData} from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

describe('StatisticsService', () => {
  let service: StatisticsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [
        StatisticsService, 
        { provide: BaseURL, useValue: environment.BaseURL }
      ]
    });
    service = TestBed.inject(StatisticsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid response', () => {
    let start: Date = new Date(2020,7,21,17,0,28,47);
    let end: Date = new Date(2025,10,22,6,30,3,762);
    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';
    
    const startDatetime : string = formatDate(start, format, locale).replace(" ", "T");
    const endDatetime : string = formatDate(end, format, locale).replace(" ", "T");

    service.GetStatistics(start, end).subscribe(result => {
      if(result instanceof HttpResponse) {
        expect(result.body).toEqual(response);
      }
      
    })

    const req = httpTestingController.expectOne(`${environment.BaseURL}/statistics/${startDatetime}/${endDatetime}`);
    expect(req.request.method).toBe("GET");
    req.flush(response);
  });

  it('should return an error response', () => {
    let end: Date = new Date(2020,7,21,17,0,28,47);
    let start: Date = new Date(2025,10,22,6,30,3,762);
    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';
    
    const startDatetime : string = formatDate(start, format, locale).replace(" ", "T");
    const endDatetime : string = formatDate(end, format, locale).replace(" ", "T");

    service.GetStatistics(start, end).subscribe(result => {
      if(result instanceof HttpResponse) {
        expect(result.body).toEqual(error);
      }
      
    })

    const req = httpTestingController.expectOne(`${environment.BaseURL}/statistics/${startDatetime}/${endDatetime}`);
    expect(req.request.method).toBe("GET");
    req.flush(error);
  })
});
