import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCodeHeaderComponent } from './time-code-header.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let dateInterval = {
  start: "2020-07-21T17:00:28.047",
  end: "2025-10-22T06:30:03.762"
}

let codesResult = [{
  id: "S009",
  text: "S009 - description of S009"
},
{
  id: "S010",
  text: "S010 - description of S010"
}];

let codesResponse = [{
  code: "S009",
  description: "description of S009"
},
{
  code: "S010",
  description: "description of S010"
}];

describe('TimeCodeHeaderComponent', () => {
  let component: TimeCodeHeaderComponent;
  let fixture: ComponentFixture<TimeCodeHeaderComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeCodeHeaderComponent ],
      imports: [ 
        HttpClientTestingModule, 
        NgMultiSelectDropDownModule,
        FormsModule,
        ReactiveFormsModule 
      ],
      providers: [{ provide: BaseURL, useValue: environment.BaseURL }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeCodeHeaderComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TUS-87: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TUS-88: Verifica che l'aggiornamento della data/ora di inizio e di fine avvenga correttamente 
  it('should update dates', () => {
    const req = httpTestingController.expectOne(`${environment.BaseURL}/info/timeinterval`);
    expect(req.request.method).toBe("GET");
    req.flush(dateInterval);

    expect(component.startDatetimeValue).toEqual("2020-07-21T17:00:28.047");
    expect(component.endDatetimeValue).toEqual("2025-10-22T06:30:03.762");
  });

  // TUS-89: Verifica che l'aggiornamento dei code disponibili avvenga correttamente 
  it('should update codes', () => {
    const req = httpTestingController.expectOne(`${environment.BaseURL}/info/codedescription`);
    expect(req.request.method).toBe("GET");
    req.flush(codesResponse);

    expect(component.availableCode).toEqual(codesResult);
  });

  // TUS-90: Verifica che si apra un dialog di errore in presenza di errori all'ottenimento della data/ora di inizio e di fine
  it('should handle error dates', () => {
    const req = httpTestingController.expectOne(`${environment.BaseURL}/info/timeinterval`);
    expect(req.request.method).toBe("GET");
    req.flush("Error", { 
      status: 404, 
      statusText: "Not Found" 
    });
    expect(component['modalService'].hasOpenModals()).toBeTruthy();
  });

  // TUS-91: Verifica che si apra un dialog di errore in presenza di errori all'ottenimento dei code disponibili
  it('should handle error codes', () => {
    const req = httpTestingController.expectOne(`${environment.BaseURL}/info/codedescription`);
    expect(req.request.method).toBe("GET");
    req.flush("Error", { 
      status: 404, 
      statusText: "Not Found" 
    });
    expect(component['modalService'].hasOpenModals()).toBeTruthy();
  });

  // TUS-92: Verifica che si apra un dialog di errore quando si inseriscono valori nulli per la data/ora di inizio e di fine
  it('should submit null dates', () => {
    component.formGroup.setValue({
      startDatetime: null,
      endDatetime: null,
      code: "S009"
    });

    component.submitForm();

    expect(component['modalService'].hasOpenModals()).toBeTruthy();    
  });

  // TUS-93: Verifica che si apra un dialog di errore quando si inserisce valore nullo per la data/ora di inizio
  it('should submit only start date null', () => {
    component.formGroup.setValue({
      startDatetime: null,
      endDatetime: "2020-07-21T17:00:28.047",
      code: "S009"
    });

    component.submitForm();

    expect(component['modalService'].hasOpenModals()).toBeTruthy();    
  });

  // TUS-94: Verifica che si apra un dialog di errore quando si inserisce valore nullo per la data/ora di fine
  it('should submit only end date null', () => {
    component.formGroup.setValue({
      startDatetime: "2020-07-21T17:00:28.047",
      endDatetime: null,
      code: "S009"
    });

    component.submitForm();

    expect(component['modalService'].hasOpenModals()).toBeTruthy();    
  });  
});
