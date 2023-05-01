import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { LogService } from 'src/app/services/log.service';
import { EventSearchService } from 'src/app/services/event-search.service';
import { Log } from '../../log.classes';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    rowData = this.logService.getDisplayLog().Events;

    constructor(private logService: LogService, private eventSearchService: EventSearchService) {

    }

    ngOnInit() {
        this.eventSearchService.currentValue.subscribe(value => this.rowData = (value as Log).Events);
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


  onGridReady(params : any) {
    params.api.sizeColumnsToFit();
  }
  
} 
