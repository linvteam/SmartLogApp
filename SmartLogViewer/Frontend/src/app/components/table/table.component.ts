import {Component, OnInit} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { LogService } from 'src/app/services/log.service';
import { DialogService } from "../../services/dialog.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  value:number;
  constructor(private logService: LogService, private data: DialogService) {
    this.value = 0;
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
    this.data.currentValue.subscribe(value => this.value = value);
  }
  
} 
