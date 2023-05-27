import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


/**
 * Classe che gestisce il widget di inserimento dell'intervallo temporale
 */
@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {

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
  
}
