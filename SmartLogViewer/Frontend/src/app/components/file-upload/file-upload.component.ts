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

    private readonly FileSelectText = 'Seleziona o trascina qui il file'; // Scritta di default per la selezione del file

    currentFile?: File;                 // Il file attualmente selezionato
    progress : number | undefined;      // Il progresso auttuale di caricamento, se è undefined fa sparire dalla view la progress bar
    message = '';                       // Messaggio di errore
    labelText = this.FileSelectText;    // Il testo della label di selezione del file

    @ViewChild("fileSelector") fileSelector: any; // Gestore del controllo di input

    constructor(private uploadService: FileUploadService, private logService: LogService) {
    }

    /**
     * Aggiorna la view con le nuove informazioni riguardo il file selezionato
     * @param file il file attualmente selezionato
     */
    private updateCurrentFile(file: any): void {
        if (this.currentFile && !file) return; // Evito di deselezionare il file se premo annulla sul file dialog
        this.currentFile = file;
        if (file)
            this.labelText = file.name;
        else
            this.labelText = this.FileSelectText;
    }

    /**
     * Gestisce la selezione dei file tramite dialog, prendendo solo il primo file della lista ed ignorando tutti gli altri
     * @param event evento lanciato dal <input type="file" />
     */
    selectFile(event: any): void {
        this.updateCurrentFile(event.target.files?.item(0));
    }

    /**
     * Gestisce il drag and drop del file, prendendo solo il primo file della lista se è un csv e ignorando tutti gli altri
     * @param fileList la lista di file che viene "scaricata" sul controllo
     */
    fileDrop(fileList: any): void {
        let file = fileList.item(0);

        if (file && file.name.endsWith(".csv")) return; // Ignoro il file se non è un csv

        this.updateCurrentFile(file);
    }

    /**
     * Gestisce gli eventi lanciati dalla richiesta di upload del file, aggiornando il progresso e impostando correttamente il LogService a caricamento completato
     */
    private eventHandler(): any {
        return (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse<Log>) {
                this.logService.Log = new Log((event.body) as Log);
                this.message = "File caricato: " + this.logService.getLog().FileName;
            }
        };
    }

    /**
     * Gestisce gli errori della richiesta di caricamento del log
     */
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

    /**
     * Avvio il processo di carcamento del file di log
     */
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
