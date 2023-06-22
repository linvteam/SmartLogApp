import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CumulativeChartComponent } from './cumulative-chart.component';
import { TimeCodeHeaderComponent } from '../time-code-header/time-code-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CumulativeService } from 'src/app/services/cumulative/cumulative.service';
import { of } from 'rxjs';
import { response } from 'src/app/test_common/cumulative-response';

describe('CumulativeChartComponent', () => {
  let component: CumulativeChartComponent;
  let fixture: ComponentFixture<CumulativeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CumulativeChartComponent,
        TimeCodeHeaderComponent
      ],
      imports: [ 
        HttpClientTestingModule, 
        NgMultiSelectDropDownModule,
        FormsModule,
        ReactiveFormsModule 
      ],
      providers: [{ provide: BaseURL, useValue: environment.BaseURL }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumulativeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TUS-57: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TUS-58: Verifica che il tooltip non collida con l'asse X
  it('should get if tooltip collide with X axis', () => {
    expect(component['tooltipCollideX'](100)).toBeFalsy();
  });

  // TUS-59: Verifica che il tooltip non collida con l'asse Y
  it('should get if tooltip collide with Y axis', () => {
    expect(component['tooltipCollideY'](100)).toBeFalsy();
  });

  // TUS-60: Verifica che una data venga formattata correttamente
  it('should format correctly', () => {
    let date = new Date("2020-02-01T00:00:00.000");
    expect(component['getFormattedDate'](date)).toEqual("01/02/2020 - 00:00:00.000");
  });

  // TUS-61: Verifica che la richiesta dei dati cumulativi avvenga correttamente
  it('should call subscribe',fakeAsync(() => {

    const service = TestBed.inject(CumulativeService);
    let spy = spyOn(service, 'GetCumulativeRecords').and.returnValue(of(response));
    let subSpy = spyOn(service.GetCumulativeRecords("S009", new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762")), 'subscribe');

    component.onSubmit({
      startDatetime:   "2020-07-21T17:00:28.047",
      endDatetime: "2025-11-22T06:30:03.762"
    });

    tick();

    expect(spy).toHaveBeenCalledBefore(subSpy); 
    expect(spy).toHaveBeenCalledWith("S009", new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762"));
    
  }));

});
