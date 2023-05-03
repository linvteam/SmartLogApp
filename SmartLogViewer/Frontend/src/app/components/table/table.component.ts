import {Component, OnInit} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { LogService } from 'src/app/services/log.service';
import { EventGroupingService } from "../../services/event-grouping.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  //tempo per il raggruppamento
  regroupTime : number;

  //data di inizio del raggruppamento/sequenza
  startRegroup : Date;

  //data di fine del raggruppamento/sequenza
  endRegroup : Date;


  //data di inizio del raggruppamento/sequenza da visualizzare come header della tabella
  startDateFormatted : string;

  //data di fine del raggruppamento/sequenza da visualizzare come header della tabella
  endDateFormatted : string;
  
  //fuso orario (2 ore in ms)
  timeZoneOffset : number = 7200000;
  
  //formato delle date da visualizzare come header della tabella
  format : string = 'dd/MM/yyyy - HH:mm:ss.SSS';
  locale : string = 'it-IT';

  //numero di tabelle da visualizzare (con raggruppamento o ricerca di sequenze)
  numberOfTables:number;

  constructor(private logService: LogService, private eventGroupingService: EventGroupingService) {
    this.regroupTime = 0;
    this.numberOfTables = 1;
    this.startRegroup = new Date();
    this.endRegroup = new Date();
    this.startDateFormatted = formatDate(this.startRegroup, this.format, this.locale);
    this.endDateFormatted = formatDate(this.endRegroup, this.format, this.locale);
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

    //aggiorno dinamicamente il tempo di inizio del raggruppamento
    this.eventGroupingService.currentStartRegroup.subscribe(startRegroup =>(this.startRegroup = startRegroup));

    //aggiorno dinamicamente il tempo di fine del raggruppamento
    this.eventGroupingService.currentEndRegroup.subscribe(endRegroup =>(this.endRegroup = endRegroup));
  }

  //aggiorna i dati della tabella e dell' intestazione della tabella
  showTable(event : any){
    //ottengo dinamicamnete il valore del raggruppamento da visualizzare dallla casella di input
    const target = event.target as HTMLInputElement;
    let value : number = +target.value;
    
    //cambio i dati da visualizzare
    this.rowData = this.eventGroupingService.getRegroup(value, this.regroupTime);
    
    //aggiorno i valori del tempo di inizio e di fine del raggruppamento
    this.startDateFormatted = formatDate((new Date (this.startRegroup.getTime() - this.timeZoneOffset)), this.format, this.locale);
    this.endDateFormatted = formatDate((new Date (this.endRegroup.getTime() - this.timeZoneOffset)), this.format, this.locale);
  }
  
} 
