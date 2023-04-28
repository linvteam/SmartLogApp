import { Component } from '@angular/core';
import {ColDef} from 'ag-grid-community';
import { Log } from 'src/app/log.classes';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  constructor(private logService: LogService) {}
  
  columnDefs = [
    { field: 'date', hide: true },
    { field: 'time', hide: true },
    { headerName: 'Date-Time', valueGetter: 'return data.date + " - " + data.time', field: 'DateTime', sortable: true, filter: true, width: 250},
    { field: 'unit', sortable: true, filter: true, width: 150 },
    { field: 'subUnit', sortable: true, filter: true, width: 150 },
    { field: 'code', sortable: true, filter: true, width: 200 },
    { field: 'description', width: 400 },
    { field: 'value', width: 100 },
    { field: 'color', width: 200 },
  ];

  defaultColDef: ColDef ={
    resizable: true, suppressSizeToFit: true
  }

  rowData = this.logService.getLog().Events;
  
} 
