import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/upload/file-upload.service';
import { Header, Log, LogRow } from 'src/app/log.classes';
import { LogService } from 'src/app/services/log/log.service';


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

    @ViewChild("fileSelector") fileSelector: any;

    fileInfos?: Observable<any>;

    constructor(private uploadService: FileUploadService, private logService: LogService) { }

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

    private eventHandler(): any {
        return (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse<Log>) {
                this.logService.Log = new Log((event.body) as Log);
                let log = this.logService.getLog();

                this.message = "File caricato: " + log.FileName;
            }
        };
    }

    
    private errorHandler(): any {
        return (err: any) => {
            this.progress = 0;

            this.selectedFiles = undefined;
            this.currentFile = undefined;

            if (err.error && err.error.message) {
                if(err.error.code == 1)
                    this.message = "Formato non valido: ";
                else if (err.error.code == 2)
                    this.message = "Dati non validi: ";

                this.message = this.message.concat(err.error.message);
            } else {
                this.message = 'Impossibile caricare il file!';
            }

            this.fileSelector.nativeElement.value = null;
        }
    }

    upload(): void {
        this.progress = 0;
        this.logService.clean();

        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);

            if (file) {
                this.currentFile = file;

                this.uploadService.upload(this.currentFile).subscribe({
                    next: this.eventHandler(),
                    error: this.errorHandler()
                });
            }

            this.selectedFiles = undefined;
        }

    }

}
