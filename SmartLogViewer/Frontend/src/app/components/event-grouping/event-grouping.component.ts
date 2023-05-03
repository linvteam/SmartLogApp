import { Component, OnInit } from '@angular/core';
import { EventGroupingService } from "../../services/event-grouping.service";

@Component({
  selector: 'app-event-grouping',
  templateUrl: './event-grouping.component.html',
  styleUrls: ['./event-grouping.component.css']
})
export class EventGroupingComponent implements OnInit{

  //tempo per il raggruppamento
  regroupTime : number;
  
  constructor(private eventGroupingService: EventGroupingService) { 
    this.regroupTime = 0; 
  }
  
  ngOnInit() {
    //aggiorno dinamicamente il tempo del raggruppamento
    this.eventGroupingService.currentRegroupTime.subscribe(regroupTime => this.regroupTime = regroupTime)
  }

  getFormValues(values : any){
    //cambio il valore del tempo di raggruppamento in base all'unità di misura
    switch(values.unita) {
      case "1": {
        this.eventGroupingService.changeRegroupTimeValue(values.valore);
        break;
      }
      case "2": {
        this.eventGroupingService.changeRegroupTimeValue(values.valore * 1000);
        break;
      }
      case "3": {
        this.eventGroupingService.changeRegroupTimeValue(values.valore * 60000);
        break;
      }
      case "4": {
        this.eventGroupingService.changeRegroupTimeValue(values.valore * 3600000);
        break;
      }
      case "5": {
        this.eventGroupingService.changeRegroupTimeValue(values.valore * 86400000);
        break;
      }
      default: {
        this.eventGroupingService.changeRegroupTimeValue(values.valore);
        break;
      }
    }
  }

}
