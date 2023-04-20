import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Header, Log, LogRow } from 'src/app/log.classes';
import { LogService } from 'src/app/services/log.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService, private logService: LogService) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse<Log>) {
              this.logService.Log = new Log ((event.body) as Log);
              let log = this.logService.getLog();
              
              this.message = "File caricato: " + log.FileName;
              console.log(log);
            }
          },
          error: (err: any) => {
            this.progress = 0;

            if (err.error && err.error.message) {
              switch(err.error.code)
              {
                case 1:
                  this.message = "Formato non valido: ";
                  break;

                case 2:
                  this.message = "Dati non validi: ";
                  break;
                
                default:
              }
              this.message = this.message.concat(err.error.message);
            } else {
              this.message = 'Impossibile caricare il file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  
  }
  
}
