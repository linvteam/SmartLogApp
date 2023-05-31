import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-time-header',
  templateUrl: './time-header.component.html',
  styleUrls: ['./time-header.component.css']
})
export class TimeHeaderComponent {
  
  public startDatetimeValue: string = '2021-05-27T12:00';
  public endDatetimeValue: string = '2023-05-27T12:00';

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
  constructor(private formBuilder: FormBuilder) {

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

  public formatDate(date: string) : string {
    return (new Date(date)).toISOString().slice(0, 16);
  }
}
