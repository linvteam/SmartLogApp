import {Component, OnInit} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { LogService } from 'src/app/services/log.service';
import { EventGroupingService } from "../../services/event-grouping.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  //tempo per il raggruppamento
  regroupTime : number;
  //numero di tabelle da visualizzare (con raggruppamento o ricerca di sequenze)
  numberOfTables:number;

  constructor(private logService: LogService, private eventGroupingService: EventGroupingService) {
    this.regroupTime = 0;
    this.numberOfTables = 1;
  }
  
  columnDefs = [
    { field: 'date', hide: true },
    { field: 'time', hide: true },
    { headerName: 'Date-Time', valueGetter: 'return data.date + " - " + data.time', field: 'DateTime', sortable: true, filter: true, width: 250},
    { field: 'unit', sortable: true, filter: true, width: 100 },
    { field: 'subUnit', sortable: true, filter: true, width: 125 },
    { field: 'code', sortable: true, filter: true, width: 150 },
    { field: 'description', width: 355 },
    { field: 'value', width: 100 },
  ];

  defaultColDef: ColDef ={
    resizable: true
  }

  rowData = this.logService.getLog().Events;

  onGridReady(params : any) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
    //aggiorno dinamicamente il tempo del raggruppamento e il numero di raggruppamenti
    this.eventGroupingService.currentRegroupTime.subscribe(regroupTime => {
      this.regroupTime = regroupTime;
      this.numberOfTables = this.eventGroupingService.getNumberOfRegroups(this.regroupTime)});
  }

  showTable(values : any) {
    //cambio i dati da visualizzare
    this.rowData = this.eventGroupingService.getRegroup(values.valore, this.regroupTime);
  }
} 
