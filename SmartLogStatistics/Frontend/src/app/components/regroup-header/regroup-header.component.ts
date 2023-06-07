import { HttpResponse } from '@angular/common/http';
import {Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { InfoService } from '../../services/info/info.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ErrorModalComponent } from '../error-modal/error-modal.component';

/**
 * Classe che crea un component in cui inserire l'intervallo temporale e i campi di cui si vogliono ottenere i raggruppamenti
 */
@Component({
    selector: 'app-regroup-header',
    templateUrl: './regroup-header.component.html',
    styleUrls: ['./regroup-header.component.css']
})
export class RegroupHeaderComponent {

    /**
     * Data del primo evento presente nel DB
     */
    public startDatetimeValue: string = new Date().toISOString().slice(0, 16);
    /**
     * Data dell'ultimo evento presente nel DB
     */
    public endDatetimeValue: string = new Date().toISOString().slice(0, 16);
    /**
     * Data più piccola inseribile
     */
    public minDate = this.startDatetimeValue;
    /**
     * Data più grande inseribile
     */
    public maxDate = this.endDatetimeValue;
    /**
     * Lista dei raggruppamenti disponibili
     */
    public availableRegroup: string[] = ["Data", "Versione firmware", "Unit", "Subunit"];
    /**
     * Lista dei raggruppamenti selezionati
     */
    public selectedRegroup: string[] = [];
    /**
     * Impostazioni del menù a tendina
     */
    public dropdownSettings = {
        singleSelection: false,
        selectAllText: 'Seleziona tutto',
        unSelectAllText: 'Deseleziona tutto',
    }
    /**
     * Gestore del form
     */
    formGroup = this.formBuilder.group({
        startDatetime: '0',
        endDatetime: '1',
        regroup: new FormControl()
    });
    /**
     * Emitter dei dati del form
     */
    @Output() submitEmitter: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Crea una nuova istanza del controller del widget di inserimento dell'intervallo temporale e dei campi per il raggruppamento
     * @param formBuilder Servizio di gestione dei form
     * @param infoRepository Servizio per ottenere le informazioni dal database
     * @param modalService Servizio che si occupa di gestire i modal di bootstrap
     */
    constructor(private formBuilder: FormBuilder, private infoRepository: InfoService, private modalService: NgbModal) {
        this.loadData();
    }

    /**
     * Ottiene i valori minimi, massimi e di default da poter inserire nelle date da ricercare
     * @private
     */
    public loadData(): void {
        this.infoRepository.GetTimeInterval().subscribe({
            next: (event) => {
                if (event instanceof HttpResponse<any>) {
                    this.maxDate = event.body.end;
                    this.minDate = event.body.start;
                    this.endDatetimeValue = event.body.end;
                    this.startDatetimeValue = event.body.start;
                }
            },
            error: (error) => {
                let errorModal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
                errorModal.componentInstance.setup(error.body != undefined? error.body.message : "Non è stato possibile prelevare le date di inizio/fine", () => { this.loadData() });
            }
        });
    }

    /**
     * Metodo che gestisce il submit del form.
     */
    public submitForm(): void {

        const startDatetime = this.formGroup.value.startDatetime ? new Date(this.formGroup.value.startDatetime) : null;
        const endDatetime = this.formGroup.value.endDatetime ? new Date(this.formGroup.value.endDatetime) : null;
        const regroups = {
            data: this.selectedRegroup.includes("Data"),
            firmware: this.selectedRegroup.includes("Versione firmware"),
            unit: this.selectedRegroup.includes("Unit"),
            subunit: this.selectedRegroup.includes("Subunit")
        };
        
        if(startDatetime != null && endDatetime != null) {
            this.submitEmitter.emit({startDatetime, endDatetime, regroups});
        } else {
            let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
            modal.componentInstance.setup("Inserisci tutti i dati richiesti.");
        }

    }

    /**
     * Metodo per la formattazione di una data
     * @param date Data da formattare
     */
    public formatDate(date: string): string {
        return (new Date(date)).toISOString().slice(0, 16);
    }

}
