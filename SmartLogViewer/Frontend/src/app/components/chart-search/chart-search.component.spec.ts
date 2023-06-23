import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSearchComponent } from './chart-search.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { EventSearchComponent } from '../event-search/event-search.component';
import {mockLog} from '../../test_common/logMock'
import { LogService } from 'src/app/services/log/log.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const mockLogService = {
  getLog: () => (mockLog)}

describe('ChartSearchComponent', () => {
  let component: ChartSearchComponent;
  let fixture: ComponentFixture<ChartSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MdbAccordionModule,
        NgMultiSelectDropDownModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        ChartSearchComponent,
        EventSearchComponent
      ],
      providers: [
        { provide: LogService, useValue: mockLogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TUV-24: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
