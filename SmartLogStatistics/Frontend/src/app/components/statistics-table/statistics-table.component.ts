import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-statistics-table',
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.css']
})
export class StatisticsTableComponent {

  public fileNumber: number = 0;

  public maxEventsNumber: number = 0;

  public averageEventsNumber: number = 0;

  public standardDeviationEvents: number = 0;

  constructor(statisticsService: StatisticsService, private modalService: NgbModal) {
    statisticsService.aux.subscribe(
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
    console.log("Costruzione funziona");
  }

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

  private errorHandler(): any {
    return (err: any) => {
      let modal = this.modalService.open(ErrorModalComponent, { size: 'sm' });
      modal.componentInstance.setup(err.body.message, () => { 
        this.fileNumber = 0;
        this.maxEventsNumber = 0;
        this.averageEventsNumber = 0;
        this.standardDeviationEvents = 0; 
        console.log("Funziona un cazzo");
      });
    }
  }

}