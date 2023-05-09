import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

/**
 * Questa direttiva si occupa di gestire l'evento di drag and drop nella label della pagina di caricamento dei file
 * Si occupa di impostare la classe che attiva l'animazione e di rilanciare al component file-upload la lista di file selezionati
 */
@Directive({
  selector: '[appFileDropped]'
})
export class FileDroppedDirective {
    /**
     * Indica quando il cursore è all'interno del controllo e sta trascinando dei file, in particolare attiva la classe .fileover sul controllo
     */
    @HostBinding('class.fileover') fileOver: boolean = false;

    /**
     * Emettitore dell'evento di rilascio dei file può essere catturato dal component con la sintassi (fileDropped)="metodo($event)"
     */
    @Output() fileDropped = new EventEmitter<any>(); 

    /**
     * Gestisce l'ingresso del mouse sul controllo
     * @param e evento lanciato
     */
    @HostListener("dragover", ['$event']) public onDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = true;
    } 

    /**
     * Gestisce l'uscita del mouse dal controllo
     * @param e evento lanciato
     */
    @HostListener("dragleave", ['$event']) public onDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = false;
    } 

    /**
     * Gestisce il rilascio dei file sul controllo 
     * @param e evento lanciato
     */
    @HostListener('drop', ['$event']) public onDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.fileOver = false;
        let files = e.dataTransfer.files;
        if (files.length > 0)
            this.fileDropped.emit(files);
    }

}
