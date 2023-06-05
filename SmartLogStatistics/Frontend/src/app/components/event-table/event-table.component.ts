import { Component } from '@angular/core';
import {ColDef} from "ag-grid-community";
import {FrequencyService} from "../../services/frequency/frequency.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorModalComponent} from "../error-modal/error-modal.component";

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent {

  /**
   * Elenco dei dati da mostrare sulla tabella
   */
  public rowData: any[] = [];
  /**
   * Definizione dei campi dati da mostrare nella tabella
   */
  public columnDefs: ColDef[] = [
    { field: 'code'},
    { field: 'date'},
    { field: 'firmware' },
    { field: 'unit' },
    { field: 'subUnit'},
    { field: 'frequency' },
  ];
  /*public columnDefs: ColDef[] = [
    { field: 'code', width: 150 },
    { field: 'date', width: 150 },
    { field: 'firmware', width: 300 },
    { field: 'unit', width: 100 },
    { field: 'subUnit', width: 125 },
    { field: 'frequency', width: 250 },
  ];*/

  /**
   * Impostazione di default dei campi della tabella
   */
  public defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true
  }

  /**
   * Costruisce un oggetto per generare la tabella
   * @param totalByFirmwareService Servizio che ottiene i dati dal backend
   * @param modalService Dialog di errore
   */
  constructor(frequencyService : FrequencyService, private modalService: NgbModal) {
    frequencyService.observableSignal.subscribe(
        {
          next: () => {frequencyService.request.subscribe(
              {
                next: this.updateData(),
                error: this.errorHandler()
              }
          )},
          error: this.errorHandler()
        }
    )
  }


  /**
   * Genera una funzione per la gestione della richiesta HTTP di ottenimento dei dati
   * @returns Una funzione per la gestione della richiesta HTTP di ottenimento dei dati
   */
  private updateData(): any {
    return (event: any) => {
      if(event.body != undefined) {
        this.rowData = event.body.events;
      }
    };
  }

  /**
   * Genera una funzione per la gestione degli errori sulla richiesta HTTP di ottenimento dei dati
   * @returns Una funzione per la gestione degli errori sulla richiesta HTTP di ottenimento dei dati
   */
  private errorHandler(): any {
    return (err: any) => {
      let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
      modal.componentInstance.setup("Non è stato possibile ottenere i dati", () => {
        this.rowData = [];
      });
    }
  }
  
  /**
   * Metodo che gestisce l'evento gridReady emesso dalla tabella
   * @param params Parametri dell'evento
   */
  public onGridReady(params: any): void {
    params.api.sizeColumnsToFit();
  }
}
