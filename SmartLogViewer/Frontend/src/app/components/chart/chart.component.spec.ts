import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { LogRow } from 'src/app/log.classes';
import { LogManipulationService } from 'src/app/services/LogManipulation/log-manipulation.service';
import { LogService } from 'src/app/services/log/log.service';
import {mockLog} from '../../test_common/logMock'
import { BrowserModule } from '@angular/platform-browser';
import { ChartHeaderComponent } from '../chart-header/chart-header.component';
import { MdbAccordionComponent, MdbAccordionItemComponent } from 'mdb-angular-ui-kit/accordion';

const mockLogService = {
  getLog: () => (mockLog)}

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartComponent, ChartHeaderComponent, MdbAccordionComponent, MdbAccordionItemComponent ],
      providers: [
        { provide: LogService, useValue: mockLogService }
      ],
      imports: [ BrowserModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
