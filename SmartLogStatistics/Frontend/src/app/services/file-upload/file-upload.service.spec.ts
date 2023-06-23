import { TestBed } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseURL } from 'src/app/connection-info';
import { environment } from 'src/environments/environment';
import { HttpEventType } from '@angular/common/http';

describe('FileUploadService', () => {
  let service: FileUploadService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [
        FileUploadService, 
        { provide: BaseURL, useValue: environment.BaseURL }
      ]
    });
    service = TestBed.inject(FileUploadService);
  });

  // TUS-104: Verifica che la classe venga istanziata correttamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TUS-105: Verifica che la richiesta di caricamento dei file al back-end avvenga correttamente
  it('should construct a valid http request', () => {
    const file = new File([""], "filename");
    const response = { message: 'File uploaded successfully' };
    httpTestingController = TestBed.inject(HttpTestingController);

    service.upload(file).subscribe((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          expect(event.loaded).toEqual(event.total as number);
          break;
        case HttpEventType.Response:
          expect(event.body).toEqual(response);
          break;
        default:
          break;
      } 
    });
  
    const req = httpTestingController.expectOne(`${environment.BaseURL}/upload`);
    expect(req.request.method).toEqual('POST');
    req.flush(response);
    httpTestingController.verify();
  });

});
