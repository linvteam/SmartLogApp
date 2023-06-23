import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileUploadComponent } from './file-upload.component';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment.production';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ FileUploadComponent ],
      providers: [{ provide: BaseURL, useValue: environment.BaseURL }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // TUS-65: Verifica che la classe venga istanziata correttamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TUS-66: Verifica che il caricamento privo di file non vada a cambiare i file precedentemente caricati
  it('should upload nothing', () => {
    component.upload();
    component.beginUpload();
    expect(component.currentFiles).toHaveSize(0);
  });

  // TUS-67: Verifica che il caricamento di un file avvenga correttamente
  it('should upload one file', waitForAsync(() => {
    let files: Array<File> = new Array<File>();
    let file = new File(["foo"], "foo.csv", {
      type: "text/csv",
    });
    files.push(file);

    component.filesDrop(files);
    component.beginUpload();
    
    expect(component.currentFiles[0].status).toEqual("uploading");

    const req = httpTestingController.expectOne(`${environment.BaseURL}/upload`);
    expect(req.request.method).toBe("POST");
    req.flush("", { 
      status: 201, 
      statusText: "Created" 
    });
  }));

  // TUS-68: Verifica che il caricamento di un file che avviene con errori venga gestito correttamente
  it('should handle error', waitForAsync(() => {
    let files: Array<File> = new Array<File>();
    let file = new File(["foo"], "foo.csv", {
      type: "text/csv",
    });
    files.push(file);

    component.filesDrop(files);
    component.beginUpload();
    
    expect(component.currentFiles[0].status).toEqual("uploading");

    const req = httpTestingController.expectOne(`${environment.BaseURL}/upload`);
    expect(req.request.method).toBe("POST");
    req.flush("", { 
      status: 500, 
      statusText: "Internal Server Error" 
    });
  }));


});
