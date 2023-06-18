import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegroupHeaderComponent } from './regroup-header.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let dateInterval = {
  start: "2020-07-21T17:00:28.047",
  end: "2025-10-22T06:30:03.762"
}

describe('RegroupHeaderComponent', () => {
  let component: RegroupHeaderComponent;
  let fixture: ComponentFixture<RegroupHeaderComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegroupHeaderComponent ],
      imports: [ 
        HttpClientTestingModule, 
        NgMultiSelectDropDownModule,
        FormsModule,
        ReactiveFormsModule 
      ],
      providers: [{ provide: BaseURL, useValue: environment.BaseURL }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegroupHeaderComponent);
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
    req.flush("Error", { 
      status: 404, 
      statusText: "Not Found" 
    });
    expect(component['modalService'].hasOpenModals()).toBeTruthy();
  });

  it('should submit null dates', () => {
    component.formGroup.setValue({
      startDatetime: null,
      endDatetime: null,
      regroup: {
        data: false,
        firmware: false,
        unit: false,
        subunit: false
      }
    });
    component.selectedRegroup = [];

    component.submitForm();

    expect(component['modalService'].hasOpenModals()).toBeTruthy();    
  });

  it('should submit only start date null', () => {
    component.formGroup.setValue({
      startDatetime: null,
      endDatetime: "2020-07-21T17:00:28.047",
      regroup: {
        data: false,
        firmware: false,
        unit: false,
        subunit: false
      }
    });
    component.selectedRegroup = [];

    component.submitForm();

    expect(component['modalService'].hasOpenModals()).toBeTruthy();    
  });

  it('should submit only end date null', () => {
    component.formGroup.setValue({
      startDatetime: "2020-07-21T17:00:28.047",
      endDatetime: null,
      regroup: {
        data: false,
        firmware: false,
        unit: false,
        subunit: false
      }
    });
    component.selectedRegroup = [];

    component.submitForm();

    expect(component['modalService'].hasOpenModals()).toBeTruthy();    
  });
});
