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
    { headerName: 'Date-Time', valueGetter: 'return data.date + " - " + data.time', field: 'DateTime'},
    { field: 'unit' },
    { field: 'subUnit' },
    { field: 'code' },
    { field: 'description' },
    { field: 'value' },
    { field: 'color' },
  ];

  defaultColDef: ColDef ={
    sortable: true, filter: true, resizable: true, suppressSizeToFit: true
  }

  rowData = this.logService.getLog().Events;
  
} 
