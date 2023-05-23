import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { mockLog } from 'src/app/test_common/logMock';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FileUploadComponent ],
      providers: [{ provide: BaseURL, useValue: environment.baseUrl }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload nothing', () => {
    component.upload();
    expect(component.progress).toEqual(0); 
    expect(component['logService'].getLog()).toBeUndefined();
  });

  it('should remain the same file', () => {
    let fileName : string = component.labelText;
    let actualFile: File | undefined = component.currentFile;
    let event = {
      target: "undefined"
      };

    component.selectFile(event);
    expect(component.labelText).toEqual(fileName);
    expect(component.currentFile).toEqual(actualFile);
  });

  it('should remain the same file - fileDrop', () => {
    let fileName : string = component.labelText;
    let actualFile: File | undefined = component.currentFile;
    let list = {
      item : (value: number) => { undefined }
    };

    component.fileDrop(list);
    expect(component.labelText).toEqual(fileName);
    expect(component.currentFile).toEqual(actualFile);
  });

  it('should upload current file', () => {
    setTimeout( () => {
      component.currentFile = new File([mockLog.toString()], "filename_2");
      component.upload();
      expect(component['logService'].getLog().FileName).toEqual("filename_2");
      expect(component['logService'].getLog().Header).toEqual(mockLog.Header);
      expect(component['logService'].getLog().Events).toEqual(mockLog.Events);
    }, 2000);
  });

});







