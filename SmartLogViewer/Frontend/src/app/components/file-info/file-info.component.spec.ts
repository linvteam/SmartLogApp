import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInfoComponent } from './file-info.component';
import { Header, INIFile } from 'src/app/log.classes';
import {mockLog} from '../../test_common/logMock'
import { LogService } from 'src/app/services/log/log.service';
import { AgGridAngular } from 'ag-grid-angular';

const mockLogService = {
  getLog: () => (mockLog)}

describe('FileInfoComponent', () => {
  let component: FileInfoComponent;
  let fixture: ComponentFixture<FileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileInfoComponent, AgGridAngular ],
      providers: [
        { provide: LogService, useValue: mockLogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
