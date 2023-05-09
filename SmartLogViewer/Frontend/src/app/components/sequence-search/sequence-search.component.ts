import { Component, ViewChild } from '@angular/core';
import { SequenceSearch } from "../../LogManipulator/sequence-search";
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { Sequence } from "../../sequence.classes";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SequenceFetchService } from "../../services/fetch/sequence-fetch.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpErrorResponse } from "@angular/common/http";

/**
 * Classe che definisce il comportamento del widget di ricerca delle sequenze
 */
@Component({
    selector: 'app-sequence-search',
    templateUrl: './sequence-search.component.html',
    styleUrls: ['./sequence-search.component.css']
})
export class SequenceSearchComponent {

    /**
     * Titolo del dialog che mostra un errore di comunucazione con il backend
     */
    modalTitle: string = "";

    /**
     * Contenuto del dialog che mostra un errore di comunicazione con il backend
     */
    modalContent: string = "";

    /**
     * Collegamento al template del dialog di errore 
     */
    @ViewChild('errorModal') errorModal: any;

    /**
     * Riferimento al dialog aperto
     */
    errorModalRef: any;

    /**
     * Elenco dei nomi delle sequenze note disponibili
     */
    sequences: string[] = [];

    /**
     * Controllo che ragguppa gli input del form
     */
    sequenceForm: FormGroup;

    /**
     * Costruisce una nuova istanza del controller del widget della ricerca delle sequenze note
     * @param formBuilder Formbuilder 
     * @param logManipulationService Servizio che comunica ai controlli di visualizzazione del log il nuovo LogManipulator
     * @param sequenceFetchService Servizio che si occupa di ottenre le informazini sulle sequenze
     * @param modalService Servizio che si occupa di gestire i modal di bootstrap
     */
    constructor(private formBuilder: FormBuilder, private logManipulationService: LogManipulationService, private sequenceFetchService: SequenceFetchService, private modalService: NgbModal) {
        this.sequenceForm = this.formBuilder.group(
            {
                sequence: [null, [Validators.required]],
            });

        this.sequenceForm.setValue({
            sequence: "-"
        })

        if (this.sequences == undefined || this.sequences.length == 0) {
            this.getSequencesNames();
        } else {
            this.sequences.forEach((sequence) => this.sequences.push(sequence));
        }

    }

    /**
     * Metodo che gestisce il submit del form
     */
    onSubmit() {
        this.getSequence(this.sequence?.value);
    }

    /**
     * Ottiene il nome della sequenza selezionata sul form
     */
    get sequence() {
        return this.sequenceForm.get('sequence');
    }

    /**
     * Metodo che gestisce la chiusura del dialog di errore
     */
    closeModal() {
        this.errorModalRef.close();
    }

    /**
     * Metodo che fornisce una funzione che gestisce il risultato postivo della richiesta dei nomi delle sequenze
     * @returns callback da passare all'observable che fornirà il risultato della richiesta appena disponibile
     */
    private namesHandler(): any {
        return (fetchedSequences: string[]) => {
            this.sequences.splice(0);
            fetchedSequences.forEach((sequence) => this.sequences.push(sequence));
        };
    }
    
    /**
     * Metodo che fornisce una callback che gestice un errore nella richiesta dei delle sequenze
     * @returns callback da passare all'observable che fornirà l'errore generato dalla richiesta
     */
    private errorNamesHandler(): any {
        return (err: HttpErrorResponse) => {
            this.sequences.splice(0);
            this.modalTitle = "Errore interno del server";
            this.modalContent = "Impossibile leggere il file di configurazione!";
            // MANCANO LE OPTIONS
            this.errorModalRef = this.modalService.open(this.errorModal, {
                size: 'sm'
            });
        }
    }

    /**
     * Metodo che fornisce una callback che gestisce il risultato positivo della richiesta di informazioni della sequenza richiesta
     * @returns callback da possare all'observer che fornirà il risultato della richiesta appena dispobile
     */
    private sequencesHandler(): any {
        return (fetchedSequence: Sequence) => {
            this.logManipulationService.setManipulation(new SequenceSearch(new Sequence(fetchedSequence)));
        };
    }

    /**
     * Metodo che fornisce una callback che gestisce un errore nella richiesta di informazioni di una delle sequenze
     * @returns callback da passare all'observable che fornirà l'errore generato dalla richiesta
     */
    private errorSequenceHandler(): any {
        return (err: HttpErrorResponse) => {
            this.logManipulationService.setManipulation(this.logManipulationService.getDefaultManipulator());

            let sequenceName = (err.error != "null") ? err.error : "";

            if (err.status == 404) {
                this.modalTitle = "Sequenza non trovata";
                this.modalContent = `La sequenza "${sequenceName}" non è disponibile!`;
            } else {
                this.modalTitle = "Errore interno del server";
                this.modalContent = "Impossibile leggere il file di configurazione!";
            }
            // MANCANO LE OPTIONS
            this.errorModalRef = this.modalService.open(this.errorModal, {
                size: 'sm'
            });
        }
    }

    /**
     * Metodo che avvia il fetch dei nomi delle sequenze disponibili dal backend
     */
    getSequencesNames(): void {
        this.sequenceFetchService.getSequences().subscribe(
            {
                next: this.namesHandler(),
                error: this.errorNamesHandler()
            }
        )
    }

    /**
     * Metodo che avvierà il fetch delle informazioni di una sequenza dal backend
     * @param name Nome della sequenza di cui si vogliono ottenere informazioni
     */
    getSequence(name: string): void {
        if (name == "-") {
            this.logManipulationService.setManipulation(this.logManipulationService.getDefaultManipulator());
            return;
        }

        this.sequenceFetchService.getSequenceInformation(name).subscribe({
            next: this.sequencesHandler(),
            error: this.errorSequenceHandler()
        });
    }


}
