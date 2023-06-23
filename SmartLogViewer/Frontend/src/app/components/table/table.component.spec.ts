import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import {mockLog} from '../../test_common/logMock'
import { LogService } from 'src/app/services/log/log.service';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridAngular } from 'ag-grid-angular';
import { MdbAccordionComponent, MdbAccordionItemComponent } from 'mdb-angular-ui-kit/accordion';

const mockLogService = {
  getLog: () => (mockLog)}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent, TableHeaderComponent, AgGridAngular, MdbAccordionComponent, MdbAccordionItemComponent ],
      providers: [
        { provide: LogService, useValue: mockLogService }
      ],
      imports: [ BrowserModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TUV-41: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
