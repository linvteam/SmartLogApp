import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HistogramComponent } from './histogram.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment.production';
import { TimeHeaderComponent } from '../time-header/time-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotalByCodeService } from 'src/app/services/total-by-code/total-by-code.service';
import { of } from 'rxjs';
import { response } from 'src/app/test_common/totalbycode-response';

describe('HistogramComponent', () => {
  let component: HistogramComponent;
  let fixture: ComponentFixture<HistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistogramComponent, TimeHeaderComponent ],
      imports: [ 
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [{ provide: BaseURL, useValue: environment.BaseURL }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call subscribe',fakeAsync(() => {

    const service = TestBed.inject(TotalByCodeService);
    let spy = spyOn(service, 'GetTotalByCode').and.returnValue(of(response));
    let subSpy = spyOn(service.GetTotalByCode(new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762")), 'subscribe');

    component.onSubmit({
      startDatetime:   "2020-07-21T17:00:28.047",
      endDatetime: "2025-11-22T06:30:03.762"
    });

    tick();

    expect(spy).toHaveBeenCalledBefore(subSpy); 
    expect(spy).toHaveBeenCalledWith(new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762"));
    
  }));

  it('should set correctly domain, height, range', () => {
    component['x'] = [0.2,0.2,0.1,0.3];
    component['y'] = ["S009","S010","S011"];
    component['drawChart']();
    
    expect(component['height']).toEqual(190);
    expect(component['xRange']).toEqual([100,1493]);
    expect(component['yRange']).toEqual([40, 190]);
    expect(component['xDomain']).toEqual([0,0.3]);
  });

  it('should not modify x and y', () => {
    component['sortValues']();
    expect(component['x']).toHaveSize(0);
    expect(component['y']).toHaveSize(0);
  });

  it('should not modify x and y with values', () => {
    component['x'] = [0.2,0.2,0.1,0.3];
    component['y'] = ["S009","S010","S011", "S012"];
    component['sortForm'].reset({sortSelection: "1"});
    component['sortValues']();
    expect(component['x']).toEqual([ 0.2, 0.2, 0.1, 0.3 ]);
    expect(component['y']).toEqual([ 'S009', 'S010', 'S011', 'S012' ]);
  });

  it('should order x and y with values - code', () => {
    component['x'] = [0.2,0.2,0.1,0.3];
    component['y'] = ["S010","S011", "S012", "S009"];
    component['sortForm'].reset({sortSelection: "1"});
    component['sortValues']();
    expect(component['x']).toEqual([ 0.3, 0.2, 0.2, 0.1 ]);
    expect(component['y']).toEqual([ 'S009', 'S010', 'S011', 'S012' ]);
  });

  it('should order x and y with values - frequency', () => {
    component['x'] = [0.2,0.2,0.1,0.3];
    component['y'] = ["S010","S011", "S012", "S009"];
    component['sortForm'].reset({sortSelection: "2"});
    component['sortValues']();
    expect(component['x']).toEqual([ 0.1, 0.2, 0.2, 0.3 ]);
    expect(component['y']).toEqual([ 'S012', 'S010', 'S011', 'S009' ]);
  });

});
