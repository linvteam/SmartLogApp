import {Component} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-time-code-header',
  templateUrl: './time-code-header.component.html',
  styleUrls: ['./time-code-header.component.css']
})
export class TimeCodeHeaderComponent{

  /**
   * Data del primo evento presente nel DB
   */
  public startDatetimeValue: string = '2021-05-27T12:00';
  /**
   * Data dell'ultimo evento presente nel DB
   */
  public endDatetimeValue: string = '2023-05-27T12:00';
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
  constructor(private formBuilder: FormBuilder) {
    this.availableCode = ["1","2","3","4","5","6"];
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
  public formatDate(date: string) : string {
    return (new Date(date)).toISOString().slice(0, 16);
  }
  
}
