import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSearchComponent } from './sequence-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { SequenceFetchService } from 'src/app/services/fetch/sequence-fetch.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManipulationService } from 'src/app/services/LogManipulation/log-manipulation.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, from, of } from 'rxjs';
import { mockSequence } from '../../test_common/sequenceMock'
import { Sequence } from 'src/app/sequence.classes';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Type } from '@angular/core';
import { LogManipulator } from 'src/app/LogManipulator/log-manipulator';
import { Identity } from 'src/app/LogManipulator/identity';
import { mockLog } from 'src/app/test_common/logMock';
import { LogService } from 'src/app/services/log/log.service';
import { Log } from 'src/app/log.classes';
import { SequenceSearch } from 'src/app/LogManipulator/sequence-search';

class mockLogService extends LogService{
  constructor(){
    super();
    super.Log = mockLog;
  }

  override getLog() : Log{
    return mockLog;
  }
}

@Injectable({
  providedIn: 'root'
})
export class mockSequenceFetchService extends SequenceFetchService{

  override getSequences(): Observable<any> { 
    let sequences: string[] = ['Prima', 'Seconda', 'Terza'];
    return of(sequences);
  }
  override getSequenceInformation(sequenceName: string): Observable<Sequence> {
    let sequence = mockSequence;
    return of(sequence);
  }
}

describe('SequenceSearchComponent', () => {
  let component: SequenceSearchComponent;
  let fixture: ComponentFixture<SequenceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [ SequenceSearchComponent ],
      providers: [
        FormBuilder,
        LogManipulationService,
        NgbModal,
        { provide: SequenceFetchService, useClass: mockSequenceFetchService},
        { provide: LogService, useClass: mockLogService },
        { provide: BaseURL, useValue: environment.baseUrl }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SequenceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mocked sequences', () => {
    expect(component.sequences).toEqual(['Prima', 'Seconda', 'Terza']); 
  });

  it('should have identity manipulator', (done: DoneFn) => {
    component['logManipulationService']['manipulator'].subscribe(value => {
      expect(value).toBeInstanceOf(Identity);
      done();
    }); 
    component.onSubmit();
  });

  it('should have sequence search manipulator', (done: DoneFn) => {
    component.sequenceForm.setValue({sequence : "InputMainNotOk"});

    component['logManipulationService']['manipulator'].subscribe(value => {
      expect(value).toBeInstanceOf(SequenceSearch);
      done();
    }); 
    component.onSubmit();
  });


});
