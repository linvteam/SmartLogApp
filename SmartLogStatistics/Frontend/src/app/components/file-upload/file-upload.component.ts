import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

/**
 * Controller dell'interfaccia di caricamento dei file
 */
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
     * Numero di file attualmente caricati, usato anche come indice di avanzamento nella lista di file da caricare
     */
    public uploadedFiles: number = -1;

    /**
     * Indica alla vista se mostrare il messaggio di errore a caricamento completato
     */
    public errors: boolean = false;

    /**
     * Oggetto JSON che rispecchia lo stile della barra di avanzamento generale, serve per mascherare correttamente i colori del testo
     */
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

    /**
     * Imposta lo stato corretto a tutti i file della lista e lancia il caricamento dei file sul db
     */
    public beginUpload(): void {
        if (this.currentFiles.length == 0) return;
        for (let file of this.currentFiles) {
            file.status = "waiting";
        }
        this.uploadedFiles = 0;
        this.upload();
    }

    /**
     * Genera una funzione che gestisce gli eventi del caricamento dei file (avanzamento dell'upload e completamento della richiesta)
     * @param fileIndex Indice del file che si sta caricando
     * @returns Funzione che gestisce gli eventi
     */
    private uploadEventHandler(fileIndex: number): any {
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

    /**
     * Genera una funzione che gestisce gli eventi di errore del caricamento
     * @param fileIndex Indice del file che si sta caricando sul db
     * @returns Funzione che gestisce gli errori della richiesta
     */
    private uploadErrorHandler(fileIndex: number): any {
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

    /**
     * Avvia il caricamento di un nuovo file sul db. In particolare utilizza l'indice this.uploadedFiles per scegliere il prossimo file da caricare
     */
    public upload(): void {
        if (this.uploadedFiles == -1) return;

        this.clipPercentage = { "clip-path": `inset(0 ${100 - (this.uploadedFiles / this.currentFiles.length * 100)}% 0 0)` };
        this.currentFiles[this.uploadedFiles].status = "uploading"
        this.uploadService.upload(this.currentFiles[this.uploadedFiles].file).subscribe({
            next: this.uploadEventHandler(this.uploadedFiles),
            error: this.uploadErrorHandler(this.uploadedFiles)
        });
    }

}

/**
 * Classe che raccoglie tutte le informazioni dei file che si stanno caricando sul db
 */
class SelectedFile {
    /**
     * Oggetto File da inviare al backend
     */
    public file: File;

    /**
     * Stringa che definisce lo stato del caricamento, può essere "waiting", "uploading", "error", "warning".
     * Lo stato uploading rimane anche quando il caricamento è completato con successo
     */
    public status: string = "waiting";

    /**
     * Percentuale di avanzamento dell'upload
     */
    public progress: number = 0;

    /**
     * Messaggio di errore/warning ritornato dal backend
     */
    public error: string = "";

    /**
     * JSON che rappresenta lo stile da applicare alla view per cambiare il testo sulla progress bar
     */
    public style: any = {
        "clip-path": "inset(0 100% 0 0)"
    }

    /**
     * Costruisce un nuovo oggetto che raccoglie tutte le informazioni sul caricamento dei file
     * @param fileToUpload File che si vuole caricare sul backend
     */
    constructor(private fileToUpload: File) {
        this.file = fileToUpload;
    }
}
