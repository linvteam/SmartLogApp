import { Component, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/upload/file-upload.service';
import { Log } from 'src/app/log.classes';
import { LogService } from 'src/app/services/log/log.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

    private readonly FileSelectText = 'Seleziona o trascina qui il file'

    currentFile?: File;
    progress : number | undefined;
    message = '';
    labelText = this.FileSelectText;

    @ViewChild("fileSelector") fileSelector: any;

    fileInfos?: Observable<any>;

    constructor(private uploadService: FileUploadService, private logService: LogService) {
    }

    private updateCurrentFile(file: any): void {
        if (this.currentFile && !file) return; // Evito di deselezionare il file se premo annulla sul file dialog
        this.currentFile = file;
        if (file)
            this.labelText = file.name;
        else
            this.labelText = this.FileSelectText;
    }

    /**
     * Gestisce la selezione dei file tramite dialog
     * @param event evento lanciato dal <input type="file" />
     */
    selectFile(event: any): void {
        this.updateCurrentFile(event.target.files?.item(0));
    }

    /**
     * Gestisce il drag and drop del file
     * @param fileList la lista di file che viene "scaricata" sul controllo
     */
    fileDrop(fileList: any): void {
        this.updateCurrentFile(fileList.item(0));
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

            this.updateCurrentFile(undefined);

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
            this.progress = undefined;
        }
    }

    upload(): void {
        this.progress = 0;
        this.logService.clean();


        if (this.currentFile) {

            this.uploadService.upload(this.currentFile).subscribe({
                next: this.eventHandler(),
                error: this.errorHandler()
            });

        }

    }

}
