import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { InfoService } from '../../services/info/info.service';

@Component({
    selector: 'app-time-code-header',
    templateUrl: './time-code-header.component.html',
    styleUrls: ['./time-code-header.component.css']
})
export class TimeCodeHeaderComponent {

    /**
     * Data del primo evento presente nel DB
     */
    public startDatetimeValue: string = '';
    /**
     * Data dell'ultimo evento presente nel DB
     */
    public endDatetimeValue: string = '';
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
    public availableCode: string[] = [];
    /**
     * Code selezionato
     */
    public selectedCode: string = "";
    /**
     * Impostazioni del menù a tendina
     */
    public dropdownSettings = {
        singleSelection: true,
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
     * Crea una nuova istanza del controller del widget di inserimento dell'intervallo temporale
     * @param formBuilder Servizio di gestione dei form
     */
    constructor(private formBuilder: FormBuilder, private infoRepository: InfoService) {
        infoRepository.GetTimeInterval().subscribe({
            next: (event) => {
                if (event instanceof HttpResponse<any>) {
                    this.startDatetimeValue = event.body.start;
                    this.minDate = event.body.start;
                    this.endDatetimeValue = event.body.end;
                    this.maxDate = event.body.end;
                }
            },
            error: (error) => {
                console.log(error)
            }
        });

        infoRepository.GetCodesWithDescription().subscribe({
            next: (event) => {
                console.log(event);
                if (event instanceof HttpResponse<any>) {
                    this.availableCode = event.body.map((c: any) => c.code);
                }
            },
            error: (error) => {
                console.log(error);
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
        console.log("CODE:");
        console.log(this.selectedCode);

    }

    /**
     * Metodo per la formattazione di una data da string a Date
     * @param date Data da formattare
     */
    public formatDate(date: string): string {
        return (new Date(date)).toISOString().slice(0, 16);
    }

}
