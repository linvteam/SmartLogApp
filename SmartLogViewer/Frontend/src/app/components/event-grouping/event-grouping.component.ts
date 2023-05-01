import { Component, OnInit } from '@angular/core';
import { EventGroupingService } from "../../services/event-grouping.service";

@Component({
  selector: 'app-event-grouping',
  templateUrl: './event-grouping.component.html',
  styleUrls: ['./event-grouping.component.css']
})
export class EventGroupingComponent implements OnInit{

  value:number;
  
  constructor(private data: EventGroupingService) { 
    this.value = 0; 
  }
  
  ngOnInit() {
    this.data.currentValue.subscribe(value => this.value = value)
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
      default: {
        this.data.changeValue(values.valore);
        break;
      }
    }
  }

}
