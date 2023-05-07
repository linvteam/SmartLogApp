import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { LogService } from 'src/app/services/log/log.service';
import { LogRow } from 'src/app/log.classes';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { LogManipulator  } from 'src/app/LogManipulator/log-manipulator'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

    rowData: LogRow[] = [];
    private logManipulation: LogManipulator;

    constructor(private logManipulationService: LogManipulationService) {
        this.logManipulation = logManipulationService.getDefaultManipulator();
        this.updateView();
        this.logManipulationService.manipulatedLog.subscribe(value => {
            this.logManipulation = value;
            this.updateView();
        });
    }

    private updateView() {
        this.rowData = this.logManipulation.getGroup(1);
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
