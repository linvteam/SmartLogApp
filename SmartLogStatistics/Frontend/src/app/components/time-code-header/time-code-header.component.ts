import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InfoService } from '../../services/info/info.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

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
    public selectedCode: string = "";
    /**
     * Impostazioni del menù a tendina
     */
    public dropdownSettings = {
        singleSelection: true,
        allowSearchFilter: true,
        searchPlaceholderText: "Cerca eventi"
    }

    private dialogRef: NgbModalRef | undefined;

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
    constructor(private formBuilder: FormBuilder, private infoRepository: InfoService, private modalService: NgbModal) {
        this.loadData();
    }

    private loadData(): void {
        this.infoRepository.GetTimeInterval().subscribe({
            next: (event) => {
                if (event instanceof HttpResponse<any>) {
                    this.startDatetimeValue = event.body.start;
                    this.minDate = event.body.start;
                    this.endDatetimeValue = event.body.end;
                    this.maxDate = event.body.end;
                }
            },
            error: (error) => {
                if (!this.dialogRef) {
                    this.dialogRef = this.modalService.open(ErrorModalComponent, { size: 'sm' });
                    this.dialogRef.componentInstance.setup(error.body.message, () => { this.loadData(); });
                }
            }
        });

        this.infoRepository.GetCodesWithDescription().subscribe({
            next: (event) => {
                if (event instanceof HttpResponse<any>) {
                    this.availableCode = event.body.map((c: any) => { return { id: c.code, text: `${c.code} - ${c.description}` } });
                }
            },
            error: (error) => {
                if (!this.dialogRef) {
                    this.dialogRef = this.modalService.open(ErrorModalComponent, { size: 'sm' });
                    this.dialogRef.componentInstance.setup(error.body.message, () => { this.loadData(); });
                }
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
