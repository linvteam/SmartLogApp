import { Component, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from 'src/app/services/upload/file-upload.service';
import { Log } from 'src/app/log.classes';
import { LogService } from 'src/app/services/log/log.service';
/**
 * Classe che definisce il comportamento del widget di caricamento dei file
 */
@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

    /**
     * Scritta di default per la selezione del file
     */
    private readonly FileSelectText: string = 'Seleziona o trascina qui il file'; 

    /**
     * Il file attualmente selezionato
     */
    public currentFile?: File;

    /**
     * Il progresso auttuale di caricamento, se � undefined fa sparire dalla view la progress bar
     */
    public progress: number | undefined;

    /**
     * Messaggio di errore
     */
    public message = '';

    /**
     * Il testo della label di selezione del file
     */
    public labelText :string = this.FileSelectText;

    /**
     * Gestore del controllo di input
     */
    @ViewChild("fileSelector") private fileSelector: any;

    /**
     * Costruisce una nuova classe che contralla il widget per l'upload dei file, i parametri vengono passati tramite dependecy injector
     * @param uploadService Service che si occupa di caricare sul server i file
     * @param logService Service che si occupa di passare agli altri widget il file di log ricevuto dal server
     */
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
    public selectFile(event: any): void {
        this.updateCurrentFile(event.target.files?.item(0));
    }

    /**
     * Gestisce il drag and drop del file, prendendo solo il primo file della lista se � un csv e ignorando tutti gli altri
     * @param fileList la lista di file che viene "scaricata" sul controllo
     */
    public fileDrop(fileList: any): void {
        let file = fileList.item(0);

        if (file && file.type != 'text/csv') return; // Ignoro il file se non � un csv

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
     * Avvia il processo di carcamento del file di log
     */
    public upload(): void {
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
