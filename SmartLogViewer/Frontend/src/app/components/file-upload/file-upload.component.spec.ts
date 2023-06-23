import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { mockLog } from 'src/app/test_common/logMock';
import { Log } from 'src/app/log.classes';
import { LogService } from 'src/app/services/log/log.service';

class mockLogServiceGroupableLog extends LogService{
  constructor(){
    super();
  }

  override getLog() : Log{
    return mockLog;
  }
}

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

  // TUV-31: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TUV-32: Verifica che la classe non modifichi il valore del file di log attuale provando un caricamento privo di file 
  it('should upload nothing', () => {
    component.upload();
    expect(component.progress).toEqual(0); 
    expect(component['logService'].getLog()).toBeUndefined();
  });

  // TUV-33: Verifica che la classe non modifichi il valore del file di log attuale provando il caricamento dello stesso file
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

  // TUV-34: Verifica che la classe non modifichi il valore del file di log attuale provando il caricamento dello stesso file (tramite drag-and-drop)
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

  // TUV-35: Verifica che la classe carichi correttamente un file di log
  it('should upload current file', () => {
    component['logService'] = new mockLogServiceGroupableLog();
      component.currentFile = new File([mockLog.toString()], "prova.csv");
      component.upload(); 
      expect(component['logService'].getLog().FileName).toEqual("prova.csv");
      expect(component['logService'].getLog().Header).toEqual(mockLog.Header);
      expect(component['logService'].getLog().Events).toEqual(mockLog.Events);
  });

});







