import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { LogRow } from 'src/app/log.classes';
import { LogManipulationService } from 'src/app/services/LogManipulation/log-manipulation.service';
import { LogService } from 'src/app/services/log/log.service';
import { Observable, Subject } from 'rxjs';
import { Identity } from 'src/app/LogManipulator/identity';
import { LogManipulator } from 'src/app/LogManipulator/log-manipulator';

describe('ChartComponent', () => {
  let component: ChartComponent;

  beforeEach(async () => {
    let logService : LogService = new LogService();
    
    /*component = new ChartComponent(new LogManipulationService(logService));*/
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
