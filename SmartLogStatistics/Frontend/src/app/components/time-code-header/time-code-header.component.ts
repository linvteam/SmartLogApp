import { HttpResponse } from '@angular/common/http';
import {Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoService } from '../../services/info/info.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

/**
 * Classe che crea un component in cui inserire l'intervallo temporale e il Code di cui si vogliono ottenere i dati
 */
@Component({
    selector: 'app-time-code-header',
    templateUrl: './time-code-header.component.html',
    styleUrls: ['./time-code-header.component.css']
})
export class TimeCodeHeaderComponent {

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
     * Lista dei Code disponibili
     */
    public availableCode: any[] = [];
    /**
     * Code selezionato
     */
    public selectedCode: any;
    /**
     * Impostazioni del menù a tendina
     */
    public dropdownSettings = {
        singleSelection: true,
        allowSearchFilter: true,
        searchPlaceholderText: "Cerca eventi"
    }
    /**
     * Gestore del form
     */
    formGroup = this.formBuilder.group({
        startDatetime: '0',
        endDatetime: '1',
        code: new FormControl()
    });
    /**
     * Enitter dei dati del form
     */
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    
    /**
     * Crea una nuova istanza del controller del widget di inserimento dell'intervallo temporale e dei Code
     * @param formBuilder Servizio di gestione dei form
     * @param infoRepository Servizio per ottenere le informazioni dal database
     * @param modalService Servizio che si occupa di gestire i modal di bootstrap
     */
    constructor(private formBuilder: FormBuilder, private infoRepository: InfoService, private modalService: NgbModal) {
        this.loadData();
    }

    /**
     * Ottiene i valori minimi, massimi e di default da poter inserire nelle date e i Code da ricercare
     * @private
     */
    private loadData(): void {
        this.infoRepository.GetTimeInterval().subscribe({
            next: (event) => {
                if (event instanceof HttpResponse<any>) {
                    this.startDatetimeValue = event.body.start;
                    this.endDatetimeValue = event.body.end;
                    this.minDate = event.body.start;
                    this.maxDate = event.body.end;
                }
            },
            error: (error) => {
                let errorModal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
                errorModal.componentInstance.setup(error != undefined? error.error.message : "Non è stato possibile prelevare le date di inizio/fine", () => { this.loadData(); });
            }
        });

        this.infoRepository.GetCodesWithDescription().subscribe({
            next: (event) => {
                if (event instanceof HttpResponse<any>) {
                    this.availableCode = event.body.map((c: any) => { return { id: c.code, text: `${c.code} - ${c.description}` } });
                }
            },
            error: (error) => {
                let errorModal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
                errorModal.componentInstance.setup(error != undefined? error.error.message : "Non è stato possibile prelevare i codici", () => { this.loadData(); });
            }
        });
    }

    /**
     * Metodo che gestisce il submit del form.
     */
    public submitForm(): void {

        const startDatetime = this.formGroup.value.startDatetime ? new Date(this.formGroup.value.startDatetime) : null;
        const endDatetime = this.formGroup.value.endDatetime ? new Date(this.formGroup.value.endDatetime) : null;

        if(startDatetime != null && endDatetime != null && this.selectedCode && this.selectedCode[0] != null) {
            let selectedCode = this.selectedCode[0].id;
            this.submit.emit({startDatetime, endDatetime, selectedCode});
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
