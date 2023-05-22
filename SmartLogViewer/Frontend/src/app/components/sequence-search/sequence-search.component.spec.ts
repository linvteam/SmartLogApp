import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSearchComponent } from './sequence-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { SequenceFetchService } from 'src/app/services/fetch/sequence-fetch.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogManipulationService } from 'src/app/services/LogManipulation/log-manipulation.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
        SequenceFetchService,
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
});
