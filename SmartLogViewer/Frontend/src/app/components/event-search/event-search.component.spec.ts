import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSearchComponent } from './event-search.component';
import { LogManipulationService } from 'src/app/services/LogManipulation/log-manipulation.service';
import { LogService } from 'src/app/services/log/log.service';
import {mockLog} from '../../test_common/logMock'
import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdbAccordionComponent, MdbAccordionItemComponent } from 'mdb-angular-ui-kit/accordion';

const mockLogService = {
  getLog: () => (mockLog)}

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
        { provide: LogService, useValue: mockLogService }
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
});
