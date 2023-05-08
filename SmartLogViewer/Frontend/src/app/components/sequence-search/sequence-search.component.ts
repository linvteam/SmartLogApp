import { Component, ViewChild } from '@angular/core';
import { SequenceSearch } from "../../LogManipulator/sequence-search";
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { Sequence } from "../../sequence.classes";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SequenceFetchService } from "../../services/fetch/sequence-fetch.service";
import { Identity } from "../../LogManipulator/identity";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-sequence-search',
    templateUrl: './sequence-search.component.html',
    styleUrls: ['./sequence-search.component.css']
})
export class SequenceSearchComponent {

    modalDialog: NgbModal | undefined;
    modalTitle: string = "";
    modalContent: string = "";

    @ViewChild('errorModal') errorModal: any;
    errorModalRef: any;

    sequences: string[] = [];
    sequenceForm: FormGroup;
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

    onSubmit() {
        this.getSequence(this.sequence?.value);
    }

    get sequence() {
        return this.sequenceForm.get('sequence');
    }

    closeModal() {
        this.errorModalRef.close();
    }

    // Event handlers
    private namesHandler(): any {
        return (fetchedSequences: string[]) => {
            this.sequences.splice(0);
            fetchedSequences.forEach((sequence) => this.sequences.push(sequence));
        };
    }

    private sequencesHandler(): any {
        return (fetchedSequence: Sequence) => {
            this.logManipulationService.setManipulation(new SequenceSearch(new Sequence(fetchedSequence)));
        };
    }


    // Error handlers
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

    private errorSequenceHandler(): any {
        return (err: HttpErrorResponse) => {
            this.logManipulationService.setManipulation(new Identity());

            let sequenceName = (err.error != "null") ? err.error : "";

            if (err.status == 404) {
                this.modalTitle = "Sequenza non trovata";
                this.modalContent = `La sequenza "${ sequenceName }" non è disponibile!`;
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

    // Metodi di fetch HTTP
    getSequencesNames(): void {
        this.sequenceFetchService.getSequences().subscribe(
            {
                next: this.namesHandler(),
                error: this.errorNamesHandler()
            }
        )
    }

    getSequence(name: string): void {
        if (name == "-") {
            this.logManipulationService.setManipulation(new Identity());
            return;
        }

        this.sequenceFetchService.getSequenceInformation(name).subscribe({
            next: this.sequencesHandler(),
            error: this.errorSequenceHandler()
        });
    }


}
