import { Component, OnInit } from '@angular/core';
import { EventGroupingService } from "../../services/event-grouping.service";

@Component({
  selector: 'app-event-grouping',
  templateUrl: './event-grouping.component.html',
  styleUrls: ['./event-grouping.component.css']
})
export class EventGroupingComponent implements OnInit{

  regroupTime : number;
  
  constructor(private data: EventGroupingService) { 
    this.regroupTime = 0; 
  }
  
  ngOnInit() {
    this.data.currentValue.subscribe(regroupTime => this.regroupTime = regroupTime)
  }

  getFormValues(values : any){
    switch(values.unita) {
      case "1": {
        this.data.changeValue(values.valore);
        break;
      }
      case "2": {
        this.data.changeValue(values.valore * 1000);
        break;
      }
      case "3": {
        this.data.changeValue(values.valore * 60000);
        break;
      }
      case "4": {
        this.data.changeValue(values.valore * 3600000);
        break;
      }
      case "5": {
        this.data.changeValue(values.valore * 86400000);
        break;
      }
      default: {
        this.data.changeValue(values.valore);
        break;
      }
    }
  }

}
