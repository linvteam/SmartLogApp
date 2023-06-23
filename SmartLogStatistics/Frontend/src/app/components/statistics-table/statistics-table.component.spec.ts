import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { StatisticsTableComponent } from './statistics-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { TimeHeaderComponent } from '../time-header/time-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { HttpEvent } from '@angular/common/http';
import { response } from 'src/app/test_common/statistics-response';
import { of } from 'rxjs';

describe('StatisticsTableComponent', () => {
  let component: StatisticsTableComponent;
  let fixture: ComponentFixture<StatisticsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsTableComponent, TimeHeaderComponent ],
      imports: [ 
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule 
      ],
      providers: [{ provide: BaseURL, useValue: environment.BaseURL }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TUS-85: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TUS-86: Verifica che la richiesta delle statistiche avvenga correttamente
  it('should call subscribe',fakeAsync(() => {

    const service = TestBed.inject(StatisticsService);
    let spy = spyOn(service, 'GetStatistics').and.returnValue(of(response));
    let subSpy = spyOn(service.GetStatistics(new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762")), 'subscribe');

    component.onSubmit({
      startDatetime:   "2020-07-21T17:00:28.047",
      endDatetime: "2025-11-22T06:30:03.762"
    });

    tick();

    expect(spy).toHaveBeenCalledBefore(subSpy); 
    expect(spy).toHaveBeenCalledWith(new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762"));
    
  }));

});
