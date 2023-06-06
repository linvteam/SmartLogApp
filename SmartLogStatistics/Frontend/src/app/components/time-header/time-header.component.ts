import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoService } from '../../services/info/info.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
    selector: 'app-time-header',
    templateUrl: './time-header.component.html',
    styleUrls: ['./time-header.component.css']
})
export class TimeHeaderComponent {

    /**
     * Segnale per indicare che è avvenuto il submit
     */
    @Output() submitEmitter: EventEmitter<any> = new EventEmitter<any>();
    
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
     * Gestore del form
     */
    formGroup = this.formBuilder.group({
        startDatetime: '0',
        endDatetime: '1'
    });

    /**
     * Crea una nuova istanza del controller del widget di inserimento dell'intervallo temporale
     * @param formBuilder Servizio di gestione dei form
     * @param infoRepository Servizio per ottenere le informazioni dal database
     * @param modalService Servizio che si occupa di gestire i modal di bootstrap
     */
    constructor(private formBuilder: FormBuilder, private infoRepository: InfoService, private modalService: NgbModal) {
        this.loadData();
    }

    /**
     * Ottiene i valori minimi, massimi e di default da poter inserire nelle date
     */
    private loadData() : void{
        this.infoRepository.GetTimeInterval().subscribe({
            next: (event: any) => {
                if (event instanceof HttpResponse<any>) {
                    this.minDate = event.body.start;
                    this.maxDate = event.body.end;
                    this.startDatetimeValue = this.minDate;
                    this.endDatetimeValue = this.maxDate;
                }
            }, error: (err) => {
                let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
                modal.componentInstance.setup(err.body != undefined? err.body.message : "Non è stato possibile prelevare le date di inizio/fine", () => { this.loadData() });
            }
        });
    }

    /**
     * Metodo che gestisce il submit del form.
     */
    public submitForm(): void {

        const startDatetime = this.formGroup.value.startDatetime ? new Date(this.formGroup.value.startDatetime) : null;
        const endDatetime = this.formGroup.value.endDatetime ? new Date(this.formGroup.value.endDatetime) : null;

        if(startDatetime != null && endDatetime != null) {
            this.submitEmitter.emit({startDatetime, endDatetime});
        } else {
            let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
            modal.componentInstance.setup("Le date di inizio/fine hanno valore nullo");
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
