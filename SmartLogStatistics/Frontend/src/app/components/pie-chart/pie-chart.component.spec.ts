import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment.production';
import { TimeCodeHeaderComponent } from '../time-code-header/time-code-header.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {registerLocaleData} from "@angular/common";
import localeIT from "@angular/common/locales/it"
import { response } from 'src/app/test_common/totalbyfirmware-response';
import { delay, of, subscribeOn } from 'rxjs';
import { TotalByFirmwareService } from 'src/app/services/total-by-firmware/total-by-firmware.service';
import { HttpEvent } from '@angular/common/http';
registerLocaleData(localeIT, "it");

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartComponent, TimeCodeHeaderComponent ],
      imports: [ 
        HttpClientTestingModule, 
        NgMultiSelectDropDownModule,
        FormsModule,
        ReactiveFormsModule 
      ],
      providers: [{ provide: BaseURL, useValue: environment.BaseURL }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call subscribe',fakeAsync(() => {

    let code: string = "S009";

    const service = TestBed.inject(TotalByFirmwareService);
    let spy = spyOn(service, 'GetTotalByFirmware').and.returnValue(of(response as unknown as HttpEvent<any>));
    let subSpy = spyOn(service.GetTotalByFirmware(new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762"), code), 'subscribe');

    component.onSubmit({
      startDatetime:   "2020-07-21T17:00:28.047",
      endDatetime: "2025-11-22T06:30:03.762",
      selectedCode: "S009"
    });

    tick();

    expect(spy).toHaveBeenCalledBefore(subSpy); 
    expect(spy).toHaveBeenCalledWith(new Date("2020-07-21T17:00:28.047"), new Date("2025-11-22T06:30:03.762"), code);
    
  }));

});
