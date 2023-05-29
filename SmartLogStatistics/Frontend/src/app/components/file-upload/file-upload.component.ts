import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

    /**
     * Scritta di default per la selezione dei file
     */
    private readonly FileSelectText: string = "Seleziona o trascina qui i file";

    /**
     * I file attualmente selezionati
     */
    public currentFiles: Array<SelectedFile> = new Array<SelectedFile>;

    /**
     * Gestore del controllo di input
     */
    @ViewChild("fileSelector") private fileSelector: any;

    /**
     * Testo della label sull'input
     */
    public labelText: string = this.FileSelectText;

    /**
     * Numero di file attualmente caricati
     */
    public uploadedFiles: number = -1;

    public errors: boolean = false;

    public clipPercentage: any = {"clip-path": "inset(0 100% 0 0)"};

    /**
     * Costruisce una nuova classe che controlla il comportamento del widget di upload dei file, i parametri vengono passati tramite dependency injector
     * @param uploadService Service che gestisce l'upload dei file sul server
     */
    constructor(private uploadService: FileUploadService) {

    }

    /**
     * Aggiorna la view con le nuove informazioni riguardo i file selezionati
     * @param files la lista di file che si intende caricare
     */
    private updateCurrentFiles(files: Array<File>): void {
        this.currentFiles = new Array<SelectedFile>();
        for (let file of files) {
            if(file.type == "text/csv")
                this.currentFiles.push(new SelectedFile(file));
        }
        this.labelText = `Selezionati ${this.currentFiles.length} file`;
    }

    /**
     * Gestisce la selezione dei file tramite dialog
     * @param event evento lanciato dall'input
     */
    public selectFiles(event: any): void {
        if(event.target.files) // Evito di deselezionare i files se annullo l'operazione
            this.updateCurrentFiles(event.target.files);
    }

    /**
     * Gestisce il drag and drop del file
     * @param fileList lista dei file rilasciata dall'utente
     */
    public filesDrop(fileList: any): void {
        this.updateCurrentFiles(fileList);
    }

    public beginUpload(): void {
        if (!this.currentFiles) return;
        for (let file of this.currentFiles) {
            file.status = "waiting";
        }
        this.uploadedFiles = 0;
        this.upload();
    }

    private uploadEventHandler(fileIndex: number) {
        return (event: any) => {
            if (event.type == HttpEventType.UploadProgress) {
                this.currentFiles[fileIndex].progress = Math.round(100 * event.loaded / event.total);

                this.currentFiles[fileIndex].style["clip-path"] = `inset(0 ${100 - this.currentFiles[fileIndex].progress}% 0)`;

            } else if (event instanceof HttpResponse<any>) {
                this.uploadedFiles++;
                if (this.uploadedFiles < this.currentFiles.length)
                    this.upload();
            }
        }
    }

    private uploadErrorHandler(fileIndex: number) {
        return (event: any) => {
            this.currentFiles[fileIndex].status = "failed";
            if (event.error && event.error.message) {
                if (event.error.code == 8) {
                    this.currentFiles[fileIndex].status = 'warning';
                }
                this.currentFiles[fileIndex].error = event.error.message;
            } else {
                this.currentFiles[fileIndex].error = "Impossibile caricare il file";
            }
            this.errors = true;
            this.uploadedFiles++;
            if (this.uploadedFiles < this.currentFiles.length)
                this.upload();
        }
    }

    public upload(): void {
        if (this.uploadedFiles == -1) return;

        this.clipPercentage = { "clip-path": `inset(0 ${100 - (this.uploadedFiles / this.currentFiles.length * 100)}% 0 0)` };
        console.log(this.clipPercentage)
        this.currentFiles[this.uploadedFiles].status = "uploading"
        this.uploadService.upload(this.currentFiles[this.uploadedFiles].file).subscribe({
            next: this.uploadEventHandler(this.uploadedFiles),
            error: this.uploadErrorHandler(this.uploadedFiles)
        });
    }

}

class SelectedFile {
    public file: File;
    public status: string= "wating";
    public progress: number = 0;
    public error: string = "";
    public style: any = {
        "clip-path": "inset(0 100% 0 0)"
    }

    constructor(file: File) {
        this.file = file;
    }
}
