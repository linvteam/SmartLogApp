import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSearchComponent } from './event-search.component';
import { LogManipulationService } from 'src/app/services/LogManipulation/log-manipulation.service';
import { LogService } from 'src/app/services/log/log.service';
import {mockLog} from '../../test_common/logMock'
import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdbAccordionComponent, MdbAccordionItemComponent } from 'mdb-angular-ui-kit/accordion';
import { EventSearch } from 'src/app/LogManipulator/event-search';
import { Log } from 'src/app/log.classes';

class mockLogServiceLog extends LogService{
  constructor(){
    super();
    super.Log = mockLog;
  }

  override getLog() : Log{
    return mockLog;
  }
}

describe('EventSearchComponent', () => {
  let component: EventSearchComponent;
  let fixture: ComponentFixture<EventSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        NgMultiSelectDropDownModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ EventSearchComponent, MdbAccordionComponent, MdbAccordionItemComponent ],
      providers : [
        LogManipulationService,
        { provide: LogService, useClass: mockLogServiceLog }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set EventSearch as LogManipulator', (done: DoneFn) => {
    component.uploadForm.setValue({
      q: '',
      units: new FormControl(),
      subunits: new FormControl()
  });
    component['logManipulationService']['manipulator'].subscribe(value => {
      expect(value).toBeInstanceOf(EventSearch);
      done();
    });    
    component.onSubmit();

  });
});
