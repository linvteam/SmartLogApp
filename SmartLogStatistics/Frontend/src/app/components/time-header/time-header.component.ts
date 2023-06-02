import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
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

    public startDatetimeValue: string = new Date().toISOString().slice(0, 16);
    public endDatetimeValue: string = new Date().toISOString().slice(0, 16);

    public minDate = this.startDatetimeValue;
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
     */
    constructor(private formBuilder: FormBuilder, private infoRepository: InfoService, private modalService: NgbModal) {
        this.loadData();
    }

    private loadData() {
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
                modal.componentInstance.setup(err.body.message, () => { this.loadData() });
            }
        });
    }

    /**
     * Metodo che gestisce il submit del form.
     */
    public submitForm(): void {

        const startDatetime = this.formGroup.value.startDatetime ? new Date(this.formGroup.value.startDatetime) : null;
        const endDatetime = this.formGroup.value.endDatetime ? new Date(this.formGroup.value.endDatetime) : null;

        console.log("INIZIO:");
        console.log(startDatetime!.getTime());
        console.log("FINE:");
        console.log(endDatetime!.getTime());

    }

    public formatDate(date: string): string {
        return (new Date(date)).toISOString().slice(0, 16);
    }
}
