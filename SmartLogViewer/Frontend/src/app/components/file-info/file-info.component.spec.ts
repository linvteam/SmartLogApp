import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInfoComponent } from './file-info.component';
import { Header, INIFile } from 'src/app/log.classes';
import { InjectionToken } from '@angular/core';

describe('FileInfoComponent', () => {
  let component: FileInfoComponent;
  let fixture: ComponentFixture<FileInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [Header, INIFile],
      declarations: [ FileInfoComponent ]
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
