import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent {

  /**
   * Numero di file del periodo in analisi
   */
  public fileNumber: number = 0;

  /**
   * Massimo numero di eventi per file del periodo in analisi
   */
  public maxEventsNumber: number = 0;

  /**
   * Numero medio di eventi per file del periodo in analisi
   */
  public averageEventsNumber: number = 0;

  /**
   * Deviazione standard del numero di eventi per file del periodo in analisi
   */
  public standardDeviationEvents: number = 0;

  /**
   * Costruisce un oggetto che rappresenta la tabella delle statistiche
   * @param statisticsService Servizio di fetch delle statistiche
   * @param modalService Dialog di errore
   */
  constructor(statisticsService: StatisticsService, private modalService: NgbModal) {
    statisticsService.observableSignal.subscribe(
          {
            next: () => {statisticsService.request.subscribe(
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
   * Genera una funzione per la gestione della richiesta HTTP di ottenimento delle statistiche
   * @returns Una funzione per la gestione della richiesta HTTP di ottenimento delle statistiche
   */
  private updateData(): any {
    return (event: any) => {
      if(event.body != undefined) {
        this.fileNumber = event.body.statistics[0].value;
        this.maxEventsNumber = event.body.statistics[1].value;
        this.averageEventsNumber = event.body.statistics[2].value;
        this.standardDeviationEvents = event.body.statistics[3].value;
      }
    };
  }

  /**
   * Genera una funzione per la gestione degli errori sulla richiesta HTTP di ottenimento delle statistiche
   * @returns Una funzione per la gestione degli errori sulla richiesta HTTP di ottenimento delle statistiche
   */
  private errorHandler(): any {
    return (err: any) => {
      let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
      modal.componentInstance.setup("Non è stato possibile ottenere le statistiche", () => { 
        this.fileNumber = 0;
        this.maxEventsNumber = 0;
        this.averageEventsNumber = 0;
        this.standardDeviationEvents = 0;
      });
    }
  }

}