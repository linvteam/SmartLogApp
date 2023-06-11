import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeHeaderComponent } from './time-header.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {formatDate, registerLocaleData} from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

let dateInterval = {
  start: "2020-07-21T17:00:28.047",
  end: "2025-10-22T06:30:03.762"
}


describe('TimeHeaderComponent', () => {
  let component: TimeHeaderComponent;
  let fixture: ComponentFixture<TimeHeaderComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeHeaderComponent ],
      imports: [ 
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule 
      ],
      providers: [{ provide: BaseURL, useValue: environment.BaseURL }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeHeaderComponent);
    httpTestingController = TestBed.inject(HttpTestingController);

    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dates', () => {
    const req = httpTestingController.expectOne(`${environment.BaseURL}/info/timeinterval`);
    expect(req.request.method).toBe("GET");
    req.flush(dateInterval);

    expect(component.startDatetimeValue).toEqual("2020-07-21T17:00:28.047");
    expect(component.endDatetimeValue).toEqual("2025-10-22T06:30:03.762");
  });

  it('should handle error', () => {
    const req = httpTestingController.expectOne(`${environment.BaseURL}/info/timeinterval`);
    expect(req.request.method).toBe("GET");
    req.flush("", { 
      status: 404, 
      statusText: "Not Found" 
    });
    expect(component['modalService'].hasOpenModals()).toBeTruthy();
  });

  it('should submit null dates', () => {
    component.formGroup.setValue({
      startDatetime: null,
      endDatetime: null
    });

    component.submitForm();

    expect(component['modalService'].hasOpenModals()).toBeTruthy();    
  });

  it('should submit only start date null', () => {
    component.formGroup.setValue({
      startDatetime: null,
      endDatetime: "2020-07-21T17:00:28.047"
    });

    component.submitForm();

    expect(component['modalService'].hasOpenModals()).toBeTruthy();    
  });

  it('should submit only end date null', () => {
    component.formGroup.setValue({
      startDatetime: "2020-07-21T17:00:28.047",
      endDatetime: null
    });

    component.submitForm();

    expect(component['modalService'].hasOpenModals()).toBeTruthy();    
  });

});
