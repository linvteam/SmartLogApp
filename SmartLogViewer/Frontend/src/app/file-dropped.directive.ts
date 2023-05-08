/**
 * Questa direttiva si occupa di gestire l'evento di drag and drop nella label della pagina di caricamento dei file
 * Si occupa di impostare la classe che attiva l'animazione e di rilanciare al component file-upload la lista di file selezionati
 */

import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileDropped]'
})
export class FileDroppedDirective {
    @HostBinding('class.fileover') fileOver: boolean = false; // Permette di attivare e disattivare la classe css sul controllo che posside la direttiva
    @Output() fileDropped = new EventEmitter<any>(); // Questa direttiva emete un evento fileDropped che può essere passato ad un component con la sintassi (fileDropped)="metodo($event)"

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
