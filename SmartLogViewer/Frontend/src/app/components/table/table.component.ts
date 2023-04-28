import { Component } from '@angular/core';
import {ColDef} from 'ag-grid-community';
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
    { headerName: 'Date-Time', valueGetter: 'return data.date + " - " + data.time', field: 'DateTime', sortable: true, filter: true, width: 220},
    { field: 'unit', sortable: true, filter: true, width: 80 },
    { field: 'subUnit', sortable: true, filter: true, width: 125 },
    { field: 'code', sortable: true, filter: true, width: 150 },
    { field: 'description', width: 355 },
    { field: 'value', width: 80 },
    { field: 'color', width: 120 },
  ];

  defaultColDef: ColDef ={
    resizable: true, suppressSizeToFit: true
  }

  rowData = this.logService.getLog().Events;
  
} 
