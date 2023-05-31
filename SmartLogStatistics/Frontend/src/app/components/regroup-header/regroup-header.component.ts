import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { InfoService } from '../../services/info/info.service';

@Component({
  selector: 'app-regroup-header',
  templateUrl: './regroup-header.component.html',
  styleUrls: ['./regroup-header.component.css']
})
export class RegroupHeaderComponent {

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
   * Lista dei raggruppamenti disponibili
   */
  public availableRegroup: string[] = [];
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
   * Crea una nuova istanza del controller del widget di inserimento dell'intervallo temporale
   * @param formBuilder Servizio di gestione dei form
   */
  constructor(private formBuilder: FormBuilder, private infoRepository: InfoService) {
      this.availableRegroup = ["Code", "Data", "Versione firmware", "Unit", "Subunit"];

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
    console.log("RAGGRUPPAMENTI:");
    console.log(this.selectedRegroup);

  }
  
  /**
   * Metodo per la formattazione di una data da string a Date
   * @param date Data da formattare
   */
  public formatDate(date: string) : string {
    return (new Date(date)).toISOString().slice(0, 16);
  }
}
