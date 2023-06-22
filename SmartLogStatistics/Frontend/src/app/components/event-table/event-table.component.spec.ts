import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EventTableComponent } from './event-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { RegroupHeaderComponent } from '../regroup-header/regroup-header.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { response } from 'src/app/test_common/frequency-response';
import { regroups } from 'src/app/test_common/frequency-regroups';
import { FrequencyService } from 'src/app/services/frequency/frequency.service';

describe('EventTableComponent', () => {
  let component: EventTableComponent;
  let fixture: ComponentFixture<EventTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTableComponent, RegroupHeaderComponent ],
      imports: [ 
        HttpClientTestingModule, 
        AgGridModule, 
        NgMultiSelectDropDownModule,
        FormsModule,
        ReactiveFormsModule 
      ],
      providers: [{ provide: BaseURL, useValue: environment.BaseURL }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TUS-63: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TUS-64: Verifica che la richiesta dei dati raggruppati avvenga correttamente
  it('should call subscribe',fakeAsync(() => {

    const service = TestBed.inject(FrequencyService);
    let spy = spyOn(service, 'GetTotalByFrequency').and.returnValue(of(response));
    let subSpy = spyOn(service.GetTotalByFrequency(new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762"), regroups), 'subscribe');

    component.onSubmit({
      startDatetime:   "2020-07-21T17:00:28.047",
      endDatetime: "2025-11-22T06:30:03.762"
    });

    tick();

    expect(spy).toHaveBeenCalledBefore(subSpy); 
    expect(spy).toHaveBeenCalledWith(new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762"), regroups);
    
  }));

});
